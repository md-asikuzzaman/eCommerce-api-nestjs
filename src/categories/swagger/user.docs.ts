import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetAllCategoriesDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all categories',
      description: 'Fetches a list of all categories.',
    }),
    ApiResponse({
      status: 200,
      description: 'Categories fetched successfully.',
    }),
  );
};

export const GetCategoryByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get category by ID',
      description: 'Fetches a single category using its unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Category fetched successfully.',
    }),
    ApiResponse({
      status: 404,
      description: 'Category not found.',
    }),
  );
};

export const CreateCategoryDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create category',
      description: 'Creates a new category.',
    }),
    ApiResponse({
      status: 201,
      description: 'Category created successfully.',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid category data.',
    }),
    ApiResponse({
      status: 409,
      description: 'A category with this name already exists.',
    }),
  );
};

export const UpdateCategoryDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update category',
      description: 'Updates an existing category using its unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Category updated successfully.',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid category data.',
    }),
    ApiResponse({
      status: 404,
      description: 'Category not found.',
    }),
    ApiResponse({
      status: 409,
      description: 'A category with this name already exists.',
    }),
  );
};

export const DeleteCategoryDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete category',
      description: 'Deletes an existing category using its unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Category deleted successfully.',
    }),
    ApiResponse({
      status: 404,
      description: 'Category not found.',
    }),
  );
};
