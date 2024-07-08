import { UnauthorizedError } from '@core/errors/unauthorized-error';
import { AccessTokenPayload } from '@core/jwt/access-token-payload';
import { CryptoService } from '@modules/crypto/crypto.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cryptoService: CryptoService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string, name: string) {
    const user = await this.usersService.create({
      email: email,
      password: password,
      name: name,
    });

    return user;
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ user: User; cookie: string }> {
    const user = await this.usersService.findOne({ email: username });

    if (!(await this.validateUser(user, password))) {
      throw new UnauthorizedError();
    }

    const payload = Object.assign(
      {},
      new AccessTokenPayload(user.id, { username: user.email }),
    );

    return {
      user,
      cookie: this.generateAccessTokenCookie(
        (await this.generateAccessToken(payload)).access_token,
      ),
    };
  }

  async signOut(): Promise<{ cookie: string }> {
    return {
      cookie: this.generateCleanUpCookie(),
    };
  }

  async verify(token: string): Promise<boolean> {
    try {
      await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        /**
         * NOTE: I have set the token life time to 300s,
         * but I'm ignoring expiration for this demo.
         * TODO: Implement refresh token strategy later.
         */
        ignoreExpiration: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async validateUser(user: User, password: string) {
    return await this.cryptoService.compareHashes(password, user.password);
  }

  private async generateAccessToken(payload: AccessTokenPayload) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_TTL'),
      }),
    };
  }

  private generateAccessTokenCookie(token: string) {
    return [
      `Authentication=${token}`,
      `HttpOnly`,
      `Path=/`,
      `Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_TTL')}`,
    ].join('; ');
  }

  private generateCleanUpCookie() {
    return [`Authentication=`, `HttpOnly`, `Path=/`, `Max-Age=`].join('; ');
  }
}
