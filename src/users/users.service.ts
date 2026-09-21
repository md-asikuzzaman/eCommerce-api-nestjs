import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      omit: {
        passwordHash: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  updateMe() {
    return { msg: 'This action updates the current user password' };
  }

  updatePassword() {
    return { msg: 'This action updates the current user password' };
  }

  getAllUsers() {
    return { msg: 'This action updates the current user password' };
  }

  getUserById() {
    return { msg: 'This action updates the current user password' };
  }

  updateUserById() {
    return { msg: 'This action updates the current user password' };
  }

  updateUserStatusById() {
    return { msg: 'This action updates the current user password' };
  }
}
