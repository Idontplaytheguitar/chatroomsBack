import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './User';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date, default: Date.now })
  sentAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
