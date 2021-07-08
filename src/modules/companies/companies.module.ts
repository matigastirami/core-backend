import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppsModule } from '../apps/apps.module';
import { UsersModule } from '../users/users.module';
import { CompaniesController } from './companies.controller';
import { CompaniesResolver } from './companies.resolver';
import { CompaniesService } from './companies.service';
import { Company, CompanySchema } from './schema/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    UsersModule,
    AppsModule
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesResolver, 
    CompaniesService,
  ],
  exports: [
    CompaniesService
  ]
})
export class CompaniesModule {}
