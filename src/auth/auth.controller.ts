import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRole } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // It's will handle by passport.js with diffrent way...
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @Body() dto: LoginDto,
    @Request()
    req: Request & {
      user: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
      };
    },
  ) {
    return this.authService.login(req.user);
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
