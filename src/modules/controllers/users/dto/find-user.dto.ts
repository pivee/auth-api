import { DataResponse } from '@core/data-response/data-response';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindUserDto extends DataResponse<User> {
  @ApiProperty({ type: User })
  public data: User;
}
