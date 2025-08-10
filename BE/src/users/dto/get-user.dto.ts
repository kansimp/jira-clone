import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { IUserInfo } from '../interfaces/user-info.interface';
import { IUserPermission, IUserRole } from '../interfaces/user-role.interface';

export class GetUserDto
  extends OmitType(UserEntity, ['password'] as const)
  implements IUserInfo, IUserRole, IUserPermission
{
  roles?: {
    name: string;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    isSystem: boolean;
  }[];
  permissions?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    action: string;
    resource: string;
  }[];
  information?: {
    bio: string | null;
    avatar: string | null;
    location: string | null;
    phone: string | null;
    timezone: string | null;
  };
}
