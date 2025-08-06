import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  helloWorld() {
    return { message: 'Hello, World!' };
  }
}
