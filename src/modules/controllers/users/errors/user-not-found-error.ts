import { NotFoundError } from '@core/errors/not-found-error';

export class UserNotFoundError extends NotFoundError {
  constructor(
    public id = undefined,
    public message = 'User not found',
  ) {
    super(message);
    if (id) message += ' for id' + id;
  }
}
