import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const GetAllProductsDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all products',
      description: 'Fetches a list of all products.',
    }),

    ApiOkResponse({
      description: 'Products fetched successfully.',
    }),
  );
};

export const GetProductByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get product by ID',
      description: 'Fetches a product by its unique ID.',
    }),

    ApiOkResponse({
      description: 'Product fetched successfully.',
    }),

    ApiNotFoundResponse({
      description: 'Product not found.',
    }),
  );
};

export const CreateProductDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create product',
      description: 'Create a new product.',
    }),

    ApiCreatedResponse({
      description: 'Product created successfully.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid product data.',
    }),

    ApiUnauthorizedResponse({
      description: 'Authentication required.',
    }),
  );
};

export const UpdateProductDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update product',
      description: 'Updates an existing product using its unique ID.',
    }),

    ApiOkResponse({
      description: 'Product updated successfully.',
    }),

    ApiNotFoundResponse({
      description: 'Product not found.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid product data.',
    }),

    ApiConflictResponse({
      description: 'A product with this SKU already exists.',
    }),
  );
};

export const DeleteProductDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete product',
      description: 'Deletes an existing product using its unique ID.',
    }),

    ApiOkResponse({
      description: 'Product deleted successfully.',
    }),

    ApiNotFoundResponse({
      description: 'Product not found.',
    }),
  );
};
