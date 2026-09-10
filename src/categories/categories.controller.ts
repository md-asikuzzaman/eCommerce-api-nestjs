import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return { msg: 'hello' };
  }

  @Get(':id')
  getCategoryById() {}

  @Post()
  createCategory() {}

  @Patch(':id')
  updateCategory() {}

  @Delete(':id')
  deleteCategory() {}
}
