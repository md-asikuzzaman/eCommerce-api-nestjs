import { Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/auth/types/authenticated-user.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getMe(user.id);
  }

  @Public()
  @Patch('me')
  updateMe() {
    return this.usersService.updateMe();
  }

  @Public()
  @Patch('me/password')
  updatePassword() {
    return this.usersService.updatePassword();
  }

  @Public()
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Public()
  @Get(':id')
  getUserById() {
    return this.usersService.getUserById();
  }

  @Public()
  @Patch(':id')
  updateUserById() {
    return this.usersService.updateUserById();
  }

  @Public()
  @Patch(':id/status')
  updateUserStatusById() {
    return this.usersService.updateUserStatusById();
  }
}
