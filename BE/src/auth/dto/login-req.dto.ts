import { ApiProperty } from '@nestjs/swagger';

export class LoginCredential {
  @ApiProperty({
    example: 'admin@email.com',
  })
  email: string;

  @ApiProperty({
    example: '1',
  })
  password: string;
}
