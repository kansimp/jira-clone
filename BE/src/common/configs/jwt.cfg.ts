export class JwtConfigs {
  static accessSecret = process.env.JWT_ACCESS_SECRET ?? '';
  static accessExpiresIn = process.env.JWT_ACCESS_TIME ?? '';

  static refreshSecret = process.env.JWT_REFRESH_SECRET ?? '';
  static refreshExpiresIn = process.env.JWT_REFRESH_TIME ?? '';
}
