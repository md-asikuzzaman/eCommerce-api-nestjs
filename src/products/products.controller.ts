import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/types/authenticated-user.type';
import { Message } from 'src/common/decorators/message.decorator';
import { GetProductsDto } from 'src/common/dto/get-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Message('Products fetched successfully')
  @Get()
  getAllProducts(@Query() query: GetProductsDto) {
    const {
      page,
      limit,
      categoryId,
      search,
      minPrice,
      maxPrice,
      sortBy,
      order,
    } = query;
    return this.productsService.getAllProducts(
      page,
      limit,
      categoryId,
      search,
      minPrice,
      maxPrice,
      sortBy,
      order,
    );
  }

  @Public()
  @Message('Product fetched successfully')
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Roles(Role.ADMIN)
  @Message('Product created successfully')
  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Roles(Role.ADMIN)
  @Message('Product updated successfully')
  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, dto);
  }

  @Roles(Role.ADMIN)
  @Message('Product deleted successfully')
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
