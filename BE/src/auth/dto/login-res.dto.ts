import { GetUserDto } from 'src/users/dto/get-user.dto';

export interface IJwtPayload {
  userId: string;
  email: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export class LoginResDto {
  user: GetUserDto;
  tokens: ITokenPair;
}
