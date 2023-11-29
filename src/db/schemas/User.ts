import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    maxlength: 20,
    minlength: 2,
    unique: true,
    required: true,
  })
  username: string;

  @Prop({ type: String, maxlength: 70, minlength: 5, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
