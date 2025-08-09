import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Ip,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserDto } from './dto/get-user.dto';
import { LoginReqDto } from './dto/login-req.dto';
import { LoginResDto } from './dto/login-res.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginReqDto: LoginReqDto, @Ip() ip: string) {
    const user: GetUserDto | null = await this.prisma.user.findFirst({
      where: {
        email: loginReqDto.email,
      },
    });

    if (!user) {
      // User not found

      throw new HttpException(
        {
          message:
            'Ohh shit, in test route, U need to register first (no need body it will auto create test user for u)',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (loginReqDto.password !== user.password) {
      // Password mismatch
      throw new HttpException(
        {
          message: 'Invalid email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userUpdated: GetUserDto | null = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
        lastLoginIp: ip,
      },
    });

    const loginResDto = new LoginResDto();
    loginResDto.user = userUpdated!;
    loginResDto.accessToken = this.jwtService.sign({ id: user.id });
    loginResDto.refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' },
    );

    return loginResDto;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register() {
    const existingUser: GetUserDto | null = await this.prisma.user.findFirst({
      where: {
        email: 'admin@email.com',
      },
    });

    if (existingUser) {
      // User already exists
      throw new HttpException(
        {
          message:
            'User already exists, U can try with "admin@email.com" password "1"',
        },
        HttpStatus.CONFLICT,
      );
    }

    const newUser: GetUserDto = await this.prisma.user.create({
      data: {
        email: 'admin@email.com',
        name: 'admin-user',
        password: '1',
        displayName: 'Admin User',
        isActive: true,
        information: {
          create: {
            bio: 'This is admin bio',
            avatar:
              'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg',
          },
        },
      },
    });

    return {
      user: newUser,
    };
  }
}
