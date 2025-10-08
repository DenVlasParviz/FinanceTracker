import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './DTO/update-category.dto';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.findAll();
  }
  @Patch(':id')
  async updateCategory(@Param('id') id:string, @Body() dto:UpdateCategoryDto){
    return this.categoriesService.update(id,dto)
  }
}
