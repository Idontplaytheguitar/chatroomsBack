import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { constants } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return 'Match';
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: constants().jwtSecret,
      }),
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
