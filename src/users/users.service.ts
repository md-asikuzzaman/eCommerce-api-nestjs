import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateMeDto } from './dto/update-user.dto';

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

  async updateMe(id: string, dto: UpdateMeDto) {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const update = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        email: dto.email,
      },
      omit: {
        passwordHash: true,
      },
    });

    return update;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await argon.verify(user.passwordHash, dto.currentPassword);

    if (!isMatch) {
      throw new UnauthorizedException('Password not matched');
    }

    const passwordHash = await argon.hash(dto.newPassword);

    const updatePassword = await this.prisma.users.update({
      where: { id },
      data: {
        passwordHash,
      },
      omit: {
        passwordHash: true,
      },
    });

    return updatePassword;
  }

  async getAllUsers() {
    const users = await this.prisma.users.findMany({
      omit: {
        passwordHash: true,
      },
    });

    return { users };
  }

  async getUserById(id: string) {
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

    return { user };
  }

  async updateUserById(id: string, dto: UpdateMeDto) {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const update = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        email: dto.email,
      },
      omit: {
        passwordHash: true,
      },
    });

    return update;
  }

  async updateUserStatusById(id: string, status: boolean) {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const update = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        isActive: status,
      },
      omit: {
        passwordHash: true,
      },
    });

    return update;
  }
}
