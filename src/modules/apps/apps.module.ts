import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';

import { MongooseModule } from '@nestjs/mongoose';
import { App, AppSchema } from './schema/app.schema';
import { AppsResolver } from './apps.resolver';

const mongooseSchemas = 
  MongooseModule.forFeature(
    [
      { name: App.name, schema: AppSchema }
    ]
  );
@Module({
  imports: [mongooseSchemas],
  controllers: [AppsController],
  providers: [AppsService, AppsResolver],
  exports: [AppsService, mongooseSchemas]
})
export class AppsModule {}
