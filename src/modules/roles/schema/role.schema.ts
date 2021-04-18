import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { App } from '../../apps/schema/app.schema';

export type RoleDocument = Role & mongoose.Document;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true })
    code: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true, min: Date.now() })
    expirationDate: Date;

    @Prop({ required: true })
    allowedActions: string[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'App' })
    appId: App;
}

export const RoleSchema = SchemaFactory.createForClass(Role);