import { DataResponse } from '@core/data-response/data-response';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindUserDto extends DataResponse<Omit<User, 'password'>> {
  @ApiProperty({ type: User })
  public data: Omit<User, 'password'>;
}
