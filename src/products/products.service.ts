import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'src/common/utils/slug.util';
import { Prisma } from '@prisma/client';
import { GetProductsDto } from 'src/common/dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(query: GetProductsDto) {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      sortBy,
      order,
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductsWhereInput = {
      ...(categoryId && { categoryId }),

      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),

      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && {
            gte: minPrice,
          }),

          ...(maxPrice !== undefined && {
            lte: maxPrice,
          }),
        },
      }),
    };

    const [products, total] = await Promise.all([
      this.prisma.products.findMany({
        where,
        skip,
        take: limit,
        orderBy: sortBy
          ? {
              [sortBy]: order ?? 'asc',
            }
          : {
              createdAt: 'desc',
            },
      }),

      this.prisma.products.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { products, meta: { page, limit, total, totalPages } };
  }

  async getProductById(id: string) {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createProduct(dto: CreateProductDto) {
    const slug = generateSlug(dto.name);

    const existing = await this.prisma.products.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      throw new ConflictException('Product already exists');
    }

    // Check if the category exists
    const category = await this.prisma.categories.findUnique({
      where: {
        id: dto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = await this.prisma.products.create({
      data: {
        ...dto,
        slug,
      },
    });

    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const existing = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!existing) throw new NotFoundException('Product not found');

    const slug = dto.name ? generateSlug(dto.name) : existing.slug;

    const updatedProduct = await this.prisma.products.update({
      where: {
        id,
      },

      data: {
        ...dto,
        slug,
      },
    });

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.prisma.products.delete({
      where: { id },
    });
  }
}
