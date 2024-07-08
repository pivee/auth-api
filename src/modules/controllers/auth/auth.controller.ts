import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  authenticate() {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.name,
    );
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    const cookie = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return response.setHeader('Set-Cookie', cookie).send();
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    const cookie = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return response.setHeader('Set-Cookie', cookie).send();
  }
}
