import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'src/common/utils/slug.util';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    const products = await this.prisma.products.findMany();
    return products;
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
