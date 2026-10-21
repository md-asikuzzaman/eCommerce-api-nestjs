import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const GetCartDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user cart',
      description: 'Fetches the cart items of the authenticated user.',
    }),
    ApiOkResponse({
      description: 'Cart items fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not exists.',
    }),
  );
};

export const AddToCartDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Add item to cart',
      description: "Adds a product to the authenticated user's cart.",
    }),
    ApiOkResponse({
      description: 'Item added to cart successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not exists.',
    }),
  );
};

export const UpdateCartItemDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update cart item',
      description:
        "Updates the quantity of a product in the authenticated user's cart.",
    }),
    ApiOkResponse({
      description: 'Cart item updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Cart item not found.',
    }),
  );
};

export const DeleteCartItemDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete cart item',
      description: "Deletes a product from the authenticated user's cart.",
    }),
    ApiOkResponse({
      description: 'Cart item deleted successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Cart item not found.',
    }),
  );
};

export const ClearCartDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Clear cart',
      description: "Clears all items from the authenticated user's cart.",
    }),
    ApiOkResponse({
      description: 'Cart cleared successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Cart not found.',
    }),
  );
};
