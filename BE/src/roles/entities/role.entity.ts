import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  name: string;
  id: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
