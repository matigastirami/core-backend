import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Company } from 'src/modules/companies/schema/company.schema';

export type AppDocument = App & Document;

@Schema({ timestamps: true })
export class App {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const AppSchema = SchemaFactory.createForClass(App);