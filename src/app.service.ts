import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './db/schemas/Room';

@Injectable()
export class AppService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async getRooms(): Promise<Room[]> {
    try {
      const rooms = await this.roomModel.find().exec();
      return rooms;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }
}
