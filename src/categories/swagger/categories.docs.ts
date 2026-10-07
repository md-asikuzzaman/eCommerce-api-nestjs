import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const GetAllCategoriesDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all categories',
      description: 'Fetches a list of all categories.',
    }),
    ApiOkResponse({
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
    ApiOkResponse({
      description: 'Category fetched successfully.',
    }),
    ApiNotFoundResponse({
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
    ApiCreatedResponse({
      description: 'Category created successfully.',
    }),
    ApiBadRequestResponse({
      description: 'Invalid category data.',
    }),
    ApiConflictResponse({
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
    ApiOkResponse({
      description: 'Category updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Category not found.',
    }),
    ApiBadRequestResponse({
      description: 'Invalid category data.',
    }),
    ApiConflictResponse({
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
    ApiOkResponse({
      description: 'Category deleted successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Category not found.',
    }),
  );
};
