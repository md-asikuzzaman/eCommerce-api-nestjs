import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  getAllCategories() {
    const categories = this.prisma.categories.findMany();

    return categories;
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
