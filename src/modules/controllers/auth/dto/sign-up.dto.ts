import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ format: 'email' })
  @IsEmail(undefined, { message: 'Email address is invalid' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least 1 letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least 1 number' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least 1 special character',
  })
  password: string;

  @ApiProperty()
  name: string;
}
