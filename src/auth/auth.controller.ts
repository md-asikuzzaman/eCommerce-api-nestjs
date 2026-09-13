import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRole } from '@prisma/client';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
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
