import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { App } from './app.schema';

export type RoleDocument = Role & mongoose.Document;

@Schema()
export class Role {
    @Prop({ required: true, unique: true })
    code: string;
  
    @Prop({ required: true, unique: true })
    description: string;
  
    @Prop({ required: true, min: Date.now() })
    expirationDate: Date;

    @Prop({ required: true })
    allowedActions: string[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'App' })
    appId: App;
}

export const RoleSchema = SchemaFactory.createForClass(Role);