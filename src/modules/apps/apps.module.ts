import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';

import { MongooseModule } from '@nestjs/mongoose';
import { App, AppSchema } from './schema/app.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: App.name, schema: AppSchema }])],
  controllers: [AppsController],
  providers: [AppsService]
})
export class AppsModule {}