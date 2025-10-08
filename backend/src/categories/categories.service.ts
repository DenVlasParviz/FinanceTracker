import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from "drizzle-orm";

import {db} from '../db'

import {categoriesTable} from '../db/schema'
import { UpdateCategoryDto } from './DTO/update-category.dto';

@Injectable()
export class CategoriesService {
async findAll() {
  return await db.select().from(categoriesTable)
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
}