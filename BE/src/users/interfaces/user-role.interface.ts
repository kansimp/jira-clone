import { Permission, Role } from '@prisma/client';

export interface IUserRole {
  roles?: Role[];
}

export interface IUserPermission {
  permissions?: Permission[];
}
