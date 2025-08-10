import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string | null;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'JohnDoe',
  })
  displayName: string | null;

  @ApiProperty({
    example: 'password123',
  })
  password: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  lastLoginIp: string | null;
}
