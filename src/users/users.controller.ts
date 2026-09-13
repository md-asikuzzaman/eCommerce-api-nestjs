import { Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('me')
  getMe() {
    return this.usersService.getMe();
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
