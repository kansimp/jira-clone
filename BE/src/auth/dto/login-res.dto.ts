import { GetUserDto } from './get-user.dto';

export class LoginResDto {
  user: GetUserDto;
  accessToken: string;
  refreshToken: string;
}
