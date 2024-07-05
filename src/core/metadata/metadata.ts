export class Metadata<T> {
  count?: number;

  constructor(data: T) {
    if (Array.isArray(data)) this.count = data.length;
  }
}
