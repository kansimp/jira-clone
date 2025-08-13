import { Injectable } from '@nestjs/common';
import { PasswordUtils } from 'src/common/utils/password-hasher.util';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterReqDto } from './dto/register-req.dto';
import { LoginCredential } from './dto/login-req.dto';
import { IJwtPayload, LoginResDto } from './dto/login-res.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
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

    const { password: _, ...result } = user;

    return result;
  }

  async register(registerReqDto: RegisterReqDto): Promise<GetUserDto> {
    const user = await this.usersService.create(registerReqDto);
    return user;
  }

  async login(loginCredential: LoginCredential): Promise<LoginResDto | null> {
    const user = await this.validateUser(
      loginCredential.email,
      loginCredential.password,
    );

    if (!user) {
      return null;
    }

    const accessToken = await this.jwtService.signAsync(
      {
        email: user.email,
        userId: user.id,
      } as IJwtPayload,
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_TIME,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        email: user.email,
        userId: user.id,
      } as IJwtPayload,
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_TIME,
      },
    );

    return {
      tokens: {
        accessToken,
        refreshToken,
      },
      user,
    };
  }
}
