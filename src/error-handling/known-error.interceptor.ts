import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundError } from '../core/errors/not-found-error';

@Injectable()
export class KnownErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error) => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        } else {
          this.logger.error(error);
          throw new InternalServerErrorException();
        }
      }),
    );
  }
}
