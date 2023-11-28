import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      console.log(password);
      return result;
    }
    return null;
  }
}
