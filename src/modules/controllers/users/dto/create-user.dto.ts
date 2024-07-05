import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  name?: string;
}
