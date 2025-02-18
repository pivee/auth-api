import { DataResponse } from '@core/data-response/data-response';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindAllUsersDto extends DataResponse<Omit<User, 'password'>[]> {
  @ApiProperty({ type: User, isArray: true })
  public data: Omit<User, 'password'>[];
}
