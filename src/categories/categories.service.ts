import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'src/common/utils/slug.util';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.categories.findMany();
    return categories;
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async createCategory(dto: CreateCategoryDto) {
    const slug = generateSlug(dto.name);

    const existing = await this.prisma.categories.findUnique({
      where: {
        slug,
      },
    });

    if (existing) throw new ConflictException('Category already exists');

    return this.prisma.categories.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    const slug = dto.name ? generateSlug(dto.name) : category.slug;

    const updatedCategory = await this.prisma.categories.update({
      where: {
        id,
      },
      data: {
        ...dto,
        slug,
      },
    });

    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    return this.prisma.categories.delete({
      where: {
        id,
      },
    });
  }
}
