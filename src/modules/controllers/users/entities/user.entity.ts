import { ApiProperty } from '@nestjs/swagger';
import { User as IUser } from '@prisma/client';

export class User implements IUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty()
  name: string;
}
