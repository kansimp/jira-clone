import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionActions } from 'src/common/enums/permission.enum';
import { ResourceTypes } from 'src/common/enums/resource.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  get() {
    return this.prisma.permission.findMany();
  }

  async initPermissions() {
    const permissions: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[] = [
      // admin permissions
      {
        action: PermissionActions.CREATE,
        resource: ResourceTypes.ALL,
        description: 'Create any resource',
      },
      {
        action: PermissionActions.READ,
        resource: ResourceTypes.ALL,
        description: 'Read any resource',
      },
      {
        action: PermissionActions.UPDATE,
        resource: ResourceTypes.ALL,
        description: 'Update any resource',
      },
      {
        action: PermissionActions.DELETE,
        resource: ResourceTypes.ALL,
        description: 'Delete any resource',
      },
      {
        action: PermissionActions.CREATE,
        resource: ResourceTypes.PROJECT,
        description: 'Create a project',
      },
      {
        action: PermissionActions.READ,
        resource: ResourceTypes.PROJECT,
        description: 'Read a project',
      },
      {
        action: PermissionActions.UPDATE,
        resource: ResourceTypes.PROJECT,
        description: 'Update a project',
      },
      {
        action: PermissionActions.DELETE,
        resource: ResourceTypes.PROJECT,
        description: 'Delete a project',
      },
      {
        action: PermissionActions.READ,
        resource: ResourceTypes.OWN,
        description: 'Read resources',
      },
      {
        action: PermissionActions.UPDATE,
        resource: ResourceTypes.OWN,
        description: 'Update resources',
      },
      {
        action: PermissionActions.DELETE,
        resource: ResourceTypes.OWN,
        description: 'Delete resources',
      },
    ];

    const existingPermissions = await this.prisma.permission.findMany({
      where: {
        action: {
          in: permissions.map((p) => p.action),
        },
        resource: {
          in: permissions.map((p) => p.resource),
        },
      },
    });

    for (const permission of permissions) {
      if (
        !existingPermissions.some(
          (p) =>
            p.action === permission.action &&
            p.resource === permission.resource,
        )
      ) {
        await this.prisma.permission.create({
          data: permission,
        });
      }
    }
  }
}
