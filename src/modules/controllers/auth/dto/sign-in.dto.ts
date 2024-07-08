import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ format: 'email' })
  username: string;

  @ApiProperty()
  password: string;
}
