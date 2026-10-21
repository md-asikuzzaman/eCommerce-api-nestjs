import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const GetOrdersDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user orders',
      description: 'Fetches the orders of the authenticated user.',
    }),
    ApiOkResponse({
      description: 'Orders fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not exists.',
    }),
  );
};
export const CreateOrderDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create order',
      description: 'Creates a new order for the authenticated user.',
    }),
    ApiOkResponse({
      description: 'Order created successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not exists.',
    }),
  );
};
export const GetOrderByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get order by ID',
      description: 'Fetches an order by its ID.',
    }),
    ApiOkResponse({
      description: 'Order fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Order not found.',
    }),
  );
};

export const CancelOrderByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Cancel order by ID',
      description: 'Cancels an order by its ID.',
    }),
    ApiOkResponse({
      description: 'Order cancelled successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Order not found.',
    }),
  );
};

export const GetOrdersForAdminDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all orders for admin',
      description: 'Fetches all orders for admin users.',
    }),
    ApiOkResponse({
      description: 'Orders fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'No orders found.',
    }),
  );
};
export const GetOrderByIdForAdminDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get order by ID for admin',
      description: 'Fetches an order by its ID for admin users.',
    }),
    ApiOkResponse({
      description: 'Order fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Order not found.',
    }),
  );
};
export const UpdateOrderStatusForAdminDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update order status for admin',
      description: 'Updates the status of an order by its ID for admin users.',
    }),
    ApiOkResponse({
      description: 'Order status updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'Order not found.',
    }),
  );
};
