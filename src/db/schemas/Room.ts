import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './User';
import { Message } from './Message';
import { roomDuration } from 'src/types/roomDuration';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Messsage' })
  chat: Message[];

  @Prop()
  chatPrivate: boolean;

  @Prop()
  listed: boolean;

  @Prop()
  duration: roomDuration;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
