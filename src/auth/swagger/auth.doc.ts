import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const RegisterDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      description: 'Creates a new user account.',
    }),

    ApiCreatedResponse({
      description: 'User registered successfully.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid registration data.',
    }),

    ApiConflictResponse({
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

    ApiOkResponse({
      description: 'User logged in successfully.',
    }),

    ApiUnauthorizedResponse({
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
export const ApiBearerAuthDocs = () => {
  return applyDecorators(ApiBearerAuth('access-token'));
};
