import { UnauthorizedError } from '@core/errors/unauthorized-error';
import { CryptoService } from '@modules/crypto/crypto.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { AccessTokenPayload } from '@core/jwt/access-token-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email: username });

    if (!(await this.validateUser(user, password))) {
      throw new UnauthorizedError();
    }

    const payload = Object.assign(
      {},
      new AccessTokenPayload(user.id, { username: user.email }),
    );

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: '300s',
      }),
    };
  }

  private async validateUser(user: User, password: string) {
    return await this.cryptoService.compareHashes(password, user.password);
  }
}
