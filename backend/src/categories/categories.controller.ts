import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './DTO/update-category.dto';
import { CreateCategoryTargetDto } from './DTO/create-category-target-dto';


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

  @Post('target')
  async addTarget(@Body() dto: CreateCategoryTargetDto) {
    return this.categoriesService.addTarget(dto);
  }
  @Patch('target/:id')
  async updateTarget(@Param('id') id:string, @Body() dto:CreateCategoryTargetDto){
    return this.categoriesService.updateTarget(id,dto)
  }

}
