import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return { id: user._id, username: user.username };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string): Promise<any> {
    try {
      const newUser = await this.usersService.postUser(username, password);
      return newUser;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async logout() {
    return {
      access_token: '',
    };
  }
}
