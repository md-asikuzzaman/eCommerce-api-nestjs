import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const RegisterDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      description: 'Creates a new user account.',
    }),

    ApiResponse({
      status: 201,
      description: 'User registered successfully.',
    }),

    ApiResponse({
      status: 400,
      description: 'Invalid registration data.',
    }),

    ApiResponse({
      status: 409,
      description: 'User with this email already exists.',
    }),
  );
};

export const LoginDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Login user',
      description: 'Authenticates a user and returns an access token.',
    }),

    ApiResponse({
      status: 200,
      description: 'User logged in successfully.',
    }),

    ApiResponse({
      status: 401,
      description: 'Invalid email or password.',
    }),
  );
};

export const LogoutDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout user',
      description: 'Logs out the authenticated user.',
    }),
  );
};

export const RefreshTokenDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh access token',
      description: 'Refreshes the access token for the authenticated user.',
    }),
  );
};

// Access token from swagger docs
export const AuthDocs = () => applyDecorators(ApiBearerAuth('access-token'));
