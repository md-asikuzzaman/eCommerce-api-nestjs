import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const GetMeDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get current user profile',
      description: 'Fetches the profile of the currently authenticated user.',
    }),
    ApiOkResponse({
      description: 'Profile fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
  );
};

export const UpdateMeDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update current user profile',
      description: 'Updates the profile of the currently authenticated user.',
    }),
    ApiOkResponse({
      description: 'Profile updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),

    ApiConflictResponse({
      description: 'Email already exists.',
    }),
  );
};

export const UpdatePasswordDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update current user password',
      description: 'Updates the password of the currently authenticated user.',
    }),
    ApiOkResponse({
      description: 'Password updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
    ApiUnauthorizedResponse({
      description: 'Password not matched.',
    }),
  );
};

export const GetAllUsersDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users',
      description: 'Fetches a list of all users.',
    }),
    ApiOkResponse({
      description: 'Users fetched successfully.',
    }),
  );
};

export const GetUserByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by ID',
      description: 'Fetches a user by their ID.',
    }),
    ApiOkResponse({
      description: 'User fetched successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
  );
};

export const UpdateUserByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user by ID',
      description: 'Updates a user by their ID.',
    }),
    ApiOkResponse({
      description: 'User updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
    ApiConflictResponse({
      description: 'Email already exists.',
    }),
  );
};

export const UpdateUserStatusByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user status by ID',
      description: 'Updates the status of a user by their ID.',
    }),
    ApiOkResponse({
      description: 'User status updated successfully.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
  );
};
