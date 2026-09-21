import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role, type User } from 'src/auth/types/authenticated-user.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Message } from 'src/common/decorators/message.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateMeDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Message('Profile fetch successfully')
  getMe(@CurrentUser() user: User) {
    return this.usersService.getMe(user.id);
  }

  @Patch('me')
  @Message('Profile updated successfully')
  updateMe(@CurrentUser() user: User, @Body() dto: UpdateMeDto) {
    return this.usersService.updateMe(user.id, dto);
  }

  @Message('Password update successfully')
  @Patch('me/password')
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(user.id, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  updateUserById(@Param('id') id: string, @Body() dto: UpdateMeDto) {
    return this.usersService.updateUserById(id, dto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  updateUserStatusById(
    @Param('id') id: string,
    @Body() { status }: { status: boolean },
  ) {
    return this.usersService.updateUserStatusById(id, status);
  }
}
