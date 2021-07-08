import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Permission, PermissionSchema } from './schema/permission.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';

const mongooseSchemas = 
  MongooseModule.forFeature([
    { 
      name: User.name, 
      schema: UserSchema 
    },
    { 
      name: Permission.name, 
      schema: PermissionSchema 
    }
  ]);
@Module({
  imports: [
    mongooseSchemas
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, mongooseSchemas],
  controllers: [UsersController]
})
export class UsersModule {}
