import { Body, Controller, Post } from '@nestjs/common';
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
  async login(@Body() loginReqDto: LoginReqDto) {
    const user: GetUserDto | null = await this.prisma.user.findFirst({
      where: {
        email: loginReqDto.email,
      },
    });

    if (!user) {
      // User not found
      return {
        message:
          'Ohh shit, in test route, U need to register first (no need body it will auto create test user for u)',
      };
    }

    if (loginReqDto.password !== user.password) {
      // Password mismatch
      return {
        message: 'Invalid email or password',
      };
    }

    const loginResDto = new LoginResDto();
    loginResDto.user = user;
    loginResDto.accessToken = this.jwtService.sign({ id: user.id });
    loginResDto.refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' },
    );

    return loginResDto;
  }

  @Post('register')
  async register() {
    const existingUser: GetUserDto | null = await this.prisma.user.findFirst({
      where: {
        email: 'admin@email.com',
      },
    });

    if (existingUser) {
      // User already exists
      return {
        user: existingUser,
      };
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
