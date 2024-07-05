import { Metadata } from '../metadata/metadata';

export class DataResponse<T> {
  constructor(
    private data: T,
    private metadata?: Metadata<T>,
  ) {}
}
