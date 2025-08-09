import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
  @ApiProperty({
    example: 'admin@email.com',
  })
  email: string;

  @ApiProperty({
    example: '1',
  })
  password: string;
}
