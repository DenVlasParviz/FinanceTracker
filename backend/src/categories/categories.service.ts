import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from "drizzle-orm";

import {db} from '../db'

import { categoriesTable, categoryTargetsTable } from '../db/schema';
import { UpdateCategoryDto } from './DTO/update-category.dto';
import { CreateCategoryTargetDto } from './DTO/create-category.dto';

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

async update(id:string, dto:UpdateCategoryDto) {
  const category = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, id))
    .execute();

  if (!category.length) {
    throw new NotFoundException("Category not found");
  }

  const updated = await db
    .update(categoriesTable)
    .set({
      name: dto.name ?? category[0].name,
      assigned: dto.assigned ?? category[0].assigned,
    })
    .where(eq(categoriesTable.id, id))
    .returning()
    .execute();

  return updated[0];
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
return result;
}

}