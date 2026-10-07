import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  LoginDocs,
  LogoutDocs,
  RefreshTokenDocs,
  RegisterDocs,
} from './swagger/user.doc';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @RegisterDocs()
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @LoginDocs()
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
  @LogoutDocs()
  logout() {
    // Implement your logout logic here
    return { message: 'Logout successful' };
  }

  @Post('refresh')
  @RefreshTokenDocs()
  refreshToken() {
    // Implement your refresh token logic here
    return { message: 'Token refreshed successfully' };
  }
}
