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
import { ApiBearerAuthDocs } from 'src/auth/swagger/auth.doc';
import { Role } from 'src/auth/types/authenticated-user.type';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CreateCategoryDocs,
  DeleteCategoryDocs,
  UpdateCategoryDocs,
} from './swagger/categories.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories - Admin')
@ApiBearerAuthDocs()
@Controller({
  path: 'admin/categories',
  version: '1',
})
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.ADMIN)
  @Post()
  @CreateCategoryDocs()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  @UpdateCategoryDocs()
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @DeleteCategoryDocs()
  deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
