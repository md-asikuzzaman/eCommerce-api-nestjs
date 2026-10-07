import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/types/authenticated-user.type';
import { Message } from 'src/common/decorators/message.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import {
  CreateProductDocs,
  DeleteProductDocs,
  UpdateProductDocs,
} from './swagger/products.docs';
import { ApiTags } from '@nestjs/swagger';
import { AuthDocs } from 'src/auth/swagger/auth.doc';

@ApiTags('Products - Admin')
@AuthDocs()
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @Message('Product created successfully')
  @Post()
  @CreateProductDocs()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Roles(Role.ADMIN)
  @Message('Product updated successfully')
  @Patch(':id')
  @UpdateProductDocs()
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, dto);
  }

  @Roles(Role.ADMIN)
  @Message('Product deleted successfully')
  @Delete(':id')
  @DeleteProductDocs()
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
