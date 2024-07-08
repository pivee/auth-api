import { ConflictError } from '@core/errors/conflict-error';

export class UserAlreadyExistsError extends ConflictError {
  constructor(
    public email = undefined,
    public message = 'User already exists',
  ) {
    super(message);
    if (email) message += ' for email' + email;
  }
}
