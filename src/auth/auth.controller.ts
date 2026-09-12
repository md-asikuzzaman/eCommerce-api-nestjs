import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    // Implement your registration logic here
    return { dto };
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    // Implement your login logic here
    return { dto };
  }

  @Post('logout')
  logout() {
    // Implement your logout logic here
    return { message: 'Logout successful' };
  }

  @Post('refresh')
  refreshToken() {
    // Implement your refresh token logic here
    return { message: 'Token refreshed successfully' };
  }
}
