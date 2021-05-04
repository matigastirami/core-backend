import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { JWTGqlAuthGuard } from '../auth/guards/jwt-graphql.guard';
import { AddPermissionDto } from './dto/add-permission.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService
  ) {}

  @UseGuards(JWTGqlAuthGuard)
  @Query('user')
  async get(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JWTGqlAuthGuard)
  @Query('users')
  async findAll(@Args('filter') filter: any) {
    return this.usersService.findAll(filter);
  }

  @UseGuards(JWTGqlAuthGuard)
  @Mutation('createUser') 
  async create(@Args('input') input: CreateUserDto) {
    return this.usersService.createUser(input);
  }

  @UseGuards(JWTGqlAuthGuard)
  @Mutation('deleteUser')
  async delete(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JWTGqlAuthGuard)
  @Mutation()
  async addPermissionsToUser(@Args('input') addPermissionDto: AddPermissionDto) {
    return this.usersService.addPermissionToUser(addPermissionDto);
  }

  @UseGuards(JWTGqlAuthGuard)
  @Mutation()
  async removePermissionsFromUser(@Args('input') removePermissionDto: RemovePermissionDto) {
    // TODO: Clarify the return type of this method to avoid no-sense null values
    return this.usersService.removePermissionFromUser(removePermissionDto);
  }

  @UseGuards(JWTGqlAuthGuard)
  @Query()
  async getUserPermissions(@Args('id') id: User) {
    return this.usersService.getUserPermissions(id);
  }

  @Mutation()
  async changeUserPassword(@Args('input') input: ChangePasswordDto) {

    // TODO: Improve the reponse of changeUserPassword method
    return this.usersService.changeUserPassword(
      input.id, 
      input.oldPassword, 
      input.newPassword
    );
  }
}