import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login() {
    return {
      message: 'Login successful',
    };
  }
}
