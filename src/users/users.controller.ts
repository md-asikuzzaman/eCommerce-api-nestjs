import { Body, Controller, Get, Patch } from '@nestjs/common';
import { type User } from 'src/auth/types/authenticated-user.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Message } from 'src/common/decorators/message.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateMeDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthDocs } from 'src/auth/swagger/auth.doc';

@AuthDocs()
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
}
