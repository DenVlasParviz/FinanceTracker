import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from "drizzle-orm";

import {db} from '../db'

import { categoriesTable, categoryTargetsTable } from '../db/schema';
import { UpdateCategoryDto } from './DTO/update-category.dto';
import { CreateCategoryTargetDto } from './DTO/create-category-target-dto';
import { CreateCategoryDto } from './DTO/budget/create-category.dto';

@Injectable()
export class CategoriesService {
  async findAll() {
    const categories = await db.select().from(categoriesTable);
    const targets = await db.select().from(categoryTargetsTable);

    return categories.map(cat => ({
      ...cat,
      targets: targets.filter(t => t.categoryId === cat.id)
    }));
  }


  async createCategory(dto:CreateCategoryDto) {
    const id = crypto.randomUUID();
    let isParent = true;
    let level = 1;
    let parentId: string | null = null;

    if (dto.parentId) {
      parentId = dto.parentId;
      isParent = false;
      const parent = await db.select().from(categoriesTable).where(eq(categoriesTable.id, dto.parentId));
      level = (parent?.[0]?.level ?? 1) + 1;
    }
    const res = await db.insert(categoriesTable).values({
      id,
      name: dto.name,
      checked: false,
      level,
      assigned: 0,
      activity: 0,
      available: 0,
      isParent,
      parentId,
    }).returning({
      id: categoriesTable.id,
      name: categoriesTable.name,
      checked: categoriesTable.checked,
      level: categoriesTable.level,
      assigned: categoriesTable.assigned,
      activity: categoriesTable.activity,
      available: categoriesTable.available,
      isParent: categoriesTable.isParent,
      parentId: categoriesTable.parentId,
    });

    return res[0];
  }

async update(id:string, dto:UpdateCategoryDto) {

    const result = await db.transaction(async(tx)=>{
      const category = await tx
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, id))
        .execute();
      if (!category.length) {
        throw new NotFoundException("Category not found");
      }
const current = category[0]

      const updatedChildRes = await tx.update(categoriesTable).set({
        name: dto.name ?? current.name,
        assigned: typeof dto.assigned === 'number' ? dto.assigned : current.assigned,
      }).where(eq(categoriesTable.id, id)).returning().execute();

      const updatedChild = updatedChildRes[0];
      if (!updatedChild.isParent) {
        await tx
          .update(categoryTargetsTable)
          .set({
            assignedSoFar: updatedChild.assigned,
          })
          .where(eq(categoryTargetsTable.categoryId, updatedChild.id))
          .execute();
      }
      const childTargets = await tx
        .select()
        .from(categoryTargetsTable)
        .where(eq(categoryTargetsTable.categoryId, updatedChild.id))
        .execute();
      const updatedChildWithTargets = { ...updatedChild, targets: childTargets };


      let updatedParent: typeof updatedChild | null = null;

      if (current.parentId){
        const children = await tx.select().from(categoriesTable).where(eq(categoriesTable.parentId, current.parentId)).execute();

        const parentAssignedSum = children.reduce((a, b) => a + (b.assigned ?? 0), 0)

        const parentUpdatedRes = await tx
          .update(categoriesTable)
          .set({ assigned: parentAssignedSum })
          .where(eq(categoriesTable.id, current.parentId))
          .returning()
          .execute();

        updatedParent = parentUpdatedRes[0];
      }
      return { updatedChild: updatedChildWithTargets, updatedParent };
    })
return result;



}
async addTarget(dto:CreateCategoryTargetDto) {
const result = await db.insert(categoryTargetsTable).values({
  id:crypto.randomUUID(),
  categoryId: dto.categoryId,
  targetAmount: dto.targetAmount,
  targetType: dto.targetType,
  targetDate: dto.targetDate ? new Date(dto.targetDate).toISOString() : null,
  weeklyDays: dto.weeklyDays ?? [],
  monthlyDays: dto.monthlyDays ?? [],
  assignedSoFar: 0,
  isComplete: false,
  createdAt: new Date(),
  updatedAt: new Date(),

}).returning();
return result[0];
}

async updateTarget(id:string,dto:CreateCategoryTargetDto){
    const existing = await db.select().from(categoryTargetsTable).where(eq(categoryTargetsTable.id, id)).execute();
  if (!existing.length) {
    throw new NotFoundException('Target not found');
  }
  const result = await db.update(categoryTargetsTable).set({
    targetAmount: dto.targetAmount ?? existing[0].targetAmount,
    targetType: dto.targetType ?? existing[0].targetType,
    targetDate: dto.targetDate ? new Date(dto.targetDate).toISOString() : existing[0].targetDate,
    weeklyDays: dto.weeklyDays ?? existing[0].weeklyDays,
    monthlyDays: dto.monthlyDays ?? existing[0].monthlyDays,
    updatedAt: new Date(),
  }).where(eq(categoryTargetsTable.id, id)).returning().execute();
  return result[0];
}

}