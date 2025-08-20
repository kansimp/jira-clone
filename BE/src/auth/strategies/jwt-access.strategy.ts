import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../dto/login-res.dto';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET ?? 'jwt_access_random_string',
    });
  }

  validate(payload: IJwtPayload): IJwtPayload {
    return {
      userId: payload.userId,
      email: payload.email,
      jti: payload.jti,
      permissions: payload.permissions,
      roles: payload.roles,
    };
  }
  error(err: Error): void {
    console.error('JWT Access Strategy Error:', err);
  }
}
