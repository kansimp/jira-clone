import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
    }),
    UsersModule,
  ],
  providers: [JwtAccessGuard, AuthService, JwtAccessStrategy],
  exports: [JwtAccessGuard],
})
export class AuthModule {}
