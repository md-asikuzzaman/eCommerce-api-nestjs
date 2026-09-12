import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existing) throw new ConflictException('Email already exists');

    const passwordHash = await argon.hash(dto.password);

    const user = await this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  login(dto: LoginDto) {
    return dto;
  }
}
