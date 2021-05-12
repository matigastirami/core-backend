import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  page_url: string;

  @Prop({ required: false })
  logo_url: string;

  @Prop({ required: false })
  location: string;

  @Prop({ required: false, default: true })
  enabled: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);