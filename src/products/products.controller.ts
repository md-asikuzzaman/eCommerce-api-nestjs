import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Message } from 'src/common/decorators/message.decorator';
import { GetProductsDto } from 'src/common/dto/get-products.dto';
import { ProductsService } from './products.service';
import {
  GetAllProductsDocs,
  GetProductByIdDocs,
} from './swagger/products.docs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Message('Products fetched successfully')
  @Get()
  @GetAllProductsDocs()
  getAllProducts(@Query() query: GetProductsDto) {
    return this.productsService.getAllProducts(query);
  }

  @Public()
  @Message('Product fetched successfully')
  @Get(':id')
  @GetProductByIdDocs()
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }
}
