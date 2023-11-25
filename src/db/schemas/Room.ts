import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './User';
import { Message } from './Message';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Messsage' })
  chat: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
