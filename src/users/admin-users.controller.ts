import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/types/authenticated-user.type';
import { UpdateMeDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuthDocs } from 'src/auth/swagger/auth.doc';
import { ApiTags } from '@nestjs/swagger';
import {
  GetAllUsersDocs,
  GetUserByIdDocs,
  UpdateUserByIdDocs,
  UpdateUserStatusByIdDocs,
} from './swagger/users.docs';

@ApiTags('Users - Admin')
@ApiBearerAuthDocs()
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @GetAllUsersDocs()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @GetUserByIdDocs()
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UpdateUserByIdDocs()
  updateUserById(@Param('id') id: string, @Body() dto: UpdateMeDto) {
    return this.usersService.updateUserById(id, dto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  @UpdateUserStatusByIdDocs()
  updateUserStatusById(
    @Param('id') id: string,
    @Body() { status }: { status: boolean },
  ) {
    return this.usersService.updateUserStatusById(id, status);
  }
}
