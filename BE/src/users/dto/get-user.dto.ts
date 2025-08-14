import { JsonValue } from '@prisma/client/runtime/library';
import { UserEntity } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class GetUserDto extends OmitType(UserEntity, ['password']) {
  information: {
    bio: string | null;
    avatar: string | null;
    location: string | null;
    phone: string | null;
    timezone: string | null;
    preferences: JsonValue | null;
  } | null;
}
