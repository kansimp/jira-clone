import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../dto/login-res.dto';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const requiredPermissions =
      this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler()) || [];

    if (requiredPermissions.length === 0) {
      return true;
    }

    const userPermissions = await this.authService.getUserPermissions(
      (user as IJwtPayload).userId,
    );

    if (userPermissions.size === 0) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    const hasAllPermissions = requiredPermissions.every((p) =>
      userPermissions.has(p),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
