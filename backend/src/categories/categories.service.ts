import {Injectable } from '@nestjs/common';

import {db} from '../db/index'

import {categoriesTable} from '../db/schema'

@Injectable()
export class CategoriesService {
async findAll() {
  return await db.select().from(categoriesTable)
}

}