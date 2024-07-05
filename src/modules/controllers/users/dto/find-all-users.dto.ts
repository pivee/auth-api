import { ApiProperty } from '@nestjs/swagger';
import { DataResponse } from '../../../../core/data-response/data-response';
import { User } from '../entities/user.entity';

export class FindAllUsersDto extends DataResponse<User[]> {
  @ApiProperty({ type: User, isArray: true })
  public data: User[];
}
