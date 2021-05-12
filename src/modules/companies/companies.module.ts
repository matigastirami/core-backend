import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppsModule } from '../apps/apps.module';
import { CompaniesController } from './companies.controller';
import { CompaniesResolver } from './companies.resolver';
import { CompaniesService } from './companies.service';
import { Company, CompanySchema } from './schema/company.schema';

@Module({
  imports: [
    AppsModule,
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesResolver, CompaniesService]
})
export class CompaniesModule {}
