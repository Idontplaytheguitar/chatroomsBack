import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Auth')
  validate(
    @Body() requestBody: { username: string; password: string },
  ): Promise<any> {
    return this.authService.validateUser(
      requestBody.username,
      requestBody.password,
    );
  }
}
