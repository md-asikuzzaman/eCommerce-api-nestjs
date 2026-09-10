import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  getAllProducts() {
    return { msg: 'get all products' };
  }

  getProductById(id: string) {
    return { id };
  }

  createProduct(dto: CreateProductDto) {
    return { dto };
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    return {
      id,
      dto,
    };
  }

  deleteProduct(id: string) {
    return { id };
  }
}
