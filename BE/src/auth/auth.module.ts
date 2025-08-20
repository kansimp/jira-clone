import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { PermissionGuard } from './guards/permission.guard';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    PrismaModule,
  ],
  providers: [AuthService, JwtAccessStrategy, JwtAccessGuard, PermissionGuard],
  exports: [AuthService, JwtAccessGuard, PermissionGuard],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    await this.authService.initAuth();
  }
}
