import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '../metadata/metadata';

export class DataResponse<T> {
  @ApiProperty()
  public data: T;

  @ApiProperty({ required: false })
  public metadata;

  constructor(data: T) {
    this.data = data;
    this.metadata = new Metadata(data);
  }
}
