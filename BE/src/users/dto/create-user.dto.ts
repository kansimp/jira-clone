import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { IUserInfo } from '../interfaces/user-info.interface';

export class CreateUserDto
  extends OmitType(UserEntity, [
    'id',
    'createdAt',
    'updatedAt',
    'lastLogin',
    'lastLoginIp',
    'isActive',
  ] as const)
  implements IUserInfo
{
  @ApiProperty({
    nullable: true,
    example: {
      bio: 'Software Engineer',
      avatar: 'https://example.com/avatar.jpg',
      location: 'San Francisco, CA',
      phone: '(123) 456-7890',
      timezone: 'America/Los_Angeles',
    },
  })
  information?: {
    bio: string | null;
    avatar: string | null;
    location: string | null;
    phone: string | null;
    timezone: string | null;
  };
}
