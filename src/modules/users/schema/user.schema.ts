import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Permission } from "../../../models/permission.schema";

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: false, default: [], type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  permissions: Permission[];
}

export const UserSchema = SchemaFactory.createForClass(User);