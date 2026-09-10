import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  getAllCategories() {
    return [{ id: 1, name: 'Electronics' }];
  }

  getCategoryById(id: string) {
    return { id };
  }

  createCategory() {
    return { id: 2, name: 'New Category' };
  }

  updateCategory(id: string) {
    return { id };
  }

  deleteCategory(id: string) {
    return { id };
  }
}
