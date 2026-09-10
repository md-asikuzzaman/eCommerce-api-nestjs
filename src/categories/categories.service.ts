import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  getAllCategories() {
    return [{ id: 1, name: 'Electronics' }];
  }

  getCategoryById(id: string) {
    return { id };
  }

  createCategory(dto: CreateCategoryDto) {
    return { dto };
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    return { id, dto };
  }

  deleteCategory(id: string) {
    return { id };
  }
}
