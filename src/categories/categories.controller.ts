import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/types/authenticated-user.type';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Public()
  @Get(':id')
  getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
