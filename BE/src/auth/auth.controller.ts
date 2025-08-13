import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterReqDto } from './dto/register-req.dto';
import { AuthService } from './auth.service';
import { LoginCredential } from './dto/login-req.dto';
import { IJwtPayload } from './dto/login-res.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginCredential: LoginCredential) {
    if (!loginCredential.email || !loginCredential.password) {
      throw new BadRequestException('Email and password are required.');
    }

    const result = await this.authService.login(loginCredential);

    if (!result) {
      throw new BadRequestException('Invalid email or password.');
    }

    return {
      ...result,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerReqDto: RegisterReqDto) {
    if (!registerReqDto.email || !registerReqDto.password) {
      throw new BadRequestException('Email and password are required.');
    }

    const user = await this.authService.register(registerReqDto);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get('profile')
  getProfile(@Req() req: Request & { user: IJwtPayload }) {
    return req.user;
  }
}
