import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthDocs } from 'src/auth/swagger/auth.doc';
import { CategoriesService } from './categories.service';
import {
  GetAllCategoriesDocs,
  GetCategoryByIdDocs,
} from './swagger/categories.docs';

@Controller({
  path: 'categories',
  version: '1',
})
@AuthDocs()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  @GetAllCategoriesDocs()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Public()
  @Get(':id')
  @GetCategoryByIdDocs()
  getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.getCategoryById(id);
  }
}
