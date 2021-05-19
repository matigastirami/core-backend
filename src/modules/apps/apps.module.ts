import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';

import { MongooseModule } from '@nestjs/mongoose';
import { App, AppSchema } from './schema/app.schema';
import { AppsResolver } from './apps.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: App.name, schema: AppSchema }])],
  controllers: [AppsController],
  providers: [AppsService, AppsResolver],
  exports: [AppsService]
})
export class AppsModule {}
