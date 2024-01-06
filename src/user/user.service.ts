import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../db/schemas/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    userModel.createIndexes();
  }

  async getUser(username: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username: username }).exec();
      return user;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async postUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt());
    try {
      const newUser = await new this.userModel({
        username: username,
        email: email,
        password: hashedPass,
      }).save();
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
