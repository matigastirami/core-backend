// Nest config modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// My Controllers
import { AppController } from './app.controller';

// My services
import { AppService } from './app.service';

// Packages modules
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

// My Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppsModule } from './modules/apps/apps.module';
import { RolesModule } from './modules/roles/roles.module';
import { CompaniesModule } from './modules/companies/companies.module';

import { join } from 'path';

import { DateScalar } from './helpers/date-scalar.gql'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        })
      }),
    GraphQLModule.forRoot({
      //debug: true,
      playground: {
        title: 'Core API'
      },
      typePaths: ['./**/**/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql-ts/definitions.ts'),
        outputAs: 'class'
      },
      context: ({ req }) => {
        return {
          request: req,
        };
      },
      
    }),
    AuthModule,
    UsersModule,
    AppsModule,
    RolesModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
