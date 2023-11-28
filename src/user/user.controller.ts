import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/db/schemas/User';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('Users/:username')
  getUser(@Param('username') username: string): Promise<User> {
    return this.userService.getUser(username);
  }
}
