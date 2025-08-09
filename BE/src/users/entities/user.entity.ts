import { User } from '@prisma/client';

export class UserEntity implements User {
  name: string | null;
  id: string;
  email: string;
  displayName: string | null;
  password: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  lastLoginIp: string | null;
}
