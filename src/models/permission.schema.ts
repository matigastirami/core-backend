import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { App } from './app.schema';
import { Role } from './role.schema';

export type PermissionDocument = Permission & mongoose.Document;

@Schema()
export class Permission {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'App' })
  app: App;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);