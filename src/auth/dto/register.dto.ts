import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Mike Dane',
    description: 'Username',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({
    example: 'Admin@12345',
    description: 'User password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
