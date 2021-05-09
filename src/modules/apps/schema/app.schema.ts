import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppDocument = App & Document;

@Schema({ timestamps: true })
export class App {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, unique: true })
  description: string;

  @Prop({ required: true })
  url: string;
}

export const AppSchema = SchemaFactory.createForClass(App);