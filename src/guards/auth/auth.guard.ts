import { AuthService } from '@modules/controllers/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.cookies?.Authentication;

    if (!token) return false;

    return await this.authService.verify(token);
  }
}
