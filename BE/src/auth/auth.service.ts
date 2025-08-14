import { Injectable } from '@nestjs/common';
import { PasswordUtils } from 'src/common/utils/password-hasher.util';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterReqDto } from './dto/register-req.dto';
import { LoginCredential } from './dto/login-req.dto';
import { IJwtPayload, LoginResDto } from './dto/login-res.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigs } from 'src/common/configs/jwt.cfg';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResourceTypes } from 'src/common/enums/resource.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
    private readonly prisma: PrismaService,
  ) {}

  //#region Public Methods
  async register(registerReqDto: RegisterReqDto): Promise<GetUserDto> {
    const user = await this.usersService.create(registerReqDto);

    await this.rolesService.assignDefaultRole(user.id);

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async login(
    loginCredential: LoginCredential,
    ip?: string,
  ): Promise<LoginResDto | null> {
    const user = await this.validateUser(
      loginCredential.email,
      loginCredential.password,
    );

    if (!user) {
      return null;
    }

    const { password: _, ...safeUser } =
      await this.usersService.updateLastLogin(user.id, ip);

    const accessToken = await this.generateAccessToken({
      email: safeUser.email,
      userId: safeUser.id,
    });

    const refreshToken = await this.generateRefreshToken({
      email: safeUser.email,
      userId: safeUser.id,
    });

    return {
      tokens: {
        accessToken,
        refreshToken,
      },
      user: safeUser as GetUserDto,
    };
  }

  async initAuth() {
    await this.rolesService.initRoles();
    await this.permissionsService.initPermissions();

    const roles = await this.rolesService.get();
    const permissions = await this.permissionsService.get();

    const adminRole = roles.find((role) => role.name === 'admin');
    const userRole = roles.find((role) => role.name === 'user');
    const projectManagerRole = roles.find(
      (role) => role.name === 'project_manager',
    );

    if (adminRole) {
      await this.prisma.rolePermission.createMany({
        data: permissions
          .filter((p) => p.resource === ResourceTypes.ALL.toString())
          .map((p) => ({
            roleId: adminRole.id,
            permissionId: p.id,
          })),
        skipDuplicates: true,
      });
    }

    if (userRole) {
      await this.prisma.rolePermission.createMany({
        data: permissions
          .filter((p) => p.resource === ResourceTypes.OWN.toString())
          .map((p) => ({
            roleId: userRole.id,
            permissionId: p.id,
          })),
        skipDuplicates: true,
      });
    }

    if (projectManagerRole) {
      await this.prisma.rolePermission.createMany({
        data: permissions
          .filter((p) => p.resource === ResourceTypes.PROJECT.toString())
          .map((p) => ({
            roleId: projectManagerRole.id,
            permissionId: p.id,
          })),
        skipDuplicates: true,
      });
    }
  }
  //#endregion Public Methods

  //#region Private Methods
  private async validateUser(
    email: string,
    password: string,
  ): Promise<GetUserDto | null> {
    const user = await this.usersService.findByEmail(email);

    if (
      !user ||
      !(await PasswordUtils.comparePasswordSync(password, user.password!))
    ) {
      return null;
    }

    const { password: _, ...safeUser } = user;

    return safeUser;
  }

  private async generateAccessToken(payload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: JwtConfigs.accessSecret,
      expiresIn: JwtConfigs.accessExpiresIn,
    });
  }

  private async generateRefreshToken(payload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: JwtConfigs.refreshSecret,
      expiresIn: JwtConfigs.refreshExpiresIn,
    });
  }
  //#endregion Private Methods
}
