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
      return { username: user.username };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async login(user: { username: string; id: string }) {
    const payload = { ...user };
    try {
      return {
        access_token: this.jwtService.sign(payload, {
          secret: constants().jwtSecret,
        }),
      };
    } catch {
      throw new HttpException('Problem at log in', HttpStatus.UNAUTHORIZED);
    }
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    try {
      const newUser = await this.usersService.postUser(
        username,
        email,
        password,
      );
      return newUser;
    } catch (e) {
      throw new HttpException(
        'Problem creating the user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async logout() {
    return {
      access_token: '',
    };
  }
}
