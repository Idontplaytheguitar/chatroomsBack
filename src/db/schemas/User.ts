import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    maxlength: 20,
    minlength: 2,
    unique: true,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    minlength: 3,
    unique: true,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    maxlength: 70,
    minlength: 5,
    required: true,
    trim: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
