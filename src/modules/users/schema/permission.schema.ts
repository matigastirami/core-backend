import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { App } from '../../apps/schema/app.schema';
import { Role } from '../../roles/schema/role.schema';
import { User } from './user.schema';

export type PermissionDocument = Permission & mongoose.Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'App' })
  app: App;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);