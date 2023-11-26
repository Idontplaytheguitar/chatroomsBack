import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../db/schemas/Room';
import { User } from '../db/schemas/User';
import { roomDuration } from '../types/roomDuration';

@Injectable()
export class RoomService {
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

  async postRoom(
    roomName: string,
    creator: User,
    chatPrivate: boolean,
    listed: boolean,
    duration: roomDuration,
  ): Promise<Room> {
    try {
      const newRoom: Room = await this.roomModel.create({
        name: roomName,
        chatPrivate: chatPrivate,
        duration: duration,
        listed: listed,
        chat: [],
        users: [creator._id],
      });
      return newRoom;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }
}
