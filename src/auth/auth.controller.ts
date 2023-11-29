import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  validate(
    @Body() requestBody: { username: string; password: string },
  ): Promise<any> {
    return this.authService.validateUser(
      requestBody.username,
      requestBody.password,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() requestBody: { username: string; password: string }) {
    return this.authService.register(
      requestBody.username,
      requestBody.password,
    );
  }

  @Post('auth/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout() {
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }
}
