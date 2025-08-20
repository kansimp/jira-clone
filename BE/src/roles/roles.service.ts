import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async assignDefaultRole(id: string) {
    const getUserRolePromise = this.prisma.role.findFirst({
      where: {
        name: 'user',
      },
    });

    const getProjectManagerRolePromise = this.prisma.role.findFirst({
      where: {
        name: 'project_manager',
      },
    });

    const defaultRoles = await Promise.all([
      getUserRolePromise,
      getProjectManagerRolePromise,
    ]);

    await this.prisma.userRole.createMany({
      data: defaultRoles.map((role) => ({
        userId: id,
        roleId: role!.id,
      })),
      skipDuplicates: true,
    });
  }

  get() {
    return this.prisma.role.findMany();
  }

  async initRoles() {
    const appRoles: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'admin',
        description: 'Administrator role with full access',
        isSystem: true,
        isActive: true,
      },
      {
        name: 'user',
        description: 'Regular user role with limited access',
        isSystem: true,
        isActive: true,
      },
      {
        name: 'project_manager',
        description: 'Project manager role with access to manage projects',
        isSystem: true,
        isActive: true,
      },
    ];

    const existingRoles = await this.prisma.role.findMany({
      where: {
        name: {
          in: appRoles.map((role) => role.name),
        },
      },
    });

    for (const role of appRoles) {
      const existingRole = existingRoles.find((r) => r.name === role.name);
      if (existingRole) {
        await this.prisma.role.update({
          where: { id: existingRole.id },
          data: { ...role, updatedAt: new Date() },
        });
      } else {
        await this.prisma.role.create({
          data: {
            ...role,
          },
        });
      }
    }
  }
}
