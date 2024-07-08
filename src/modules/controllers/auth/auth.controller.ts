import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  verify(@Headers('Authorization') authorizationHeader: string) {
    return this.authService.verify(authorizationHeader.split(' ')[1]);
  }
}
