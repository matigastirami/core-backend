import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/user.schema';
import * as mongoose from 'mongoose';

export type CompanyDocument = Company & mongoose.Document;

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

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User | String;
}

export const CompanySchema = SchemaFactory.createForClass(Company);