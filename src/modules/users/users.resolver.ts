//import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
//import { JWTGqlAuthGuard } from '../auth/guards/jwt-graphql.guard';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService
  ) {}

  //@UseGuards(JWTGqlAuthGuard)
  @Query('user')
  async getUser(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation()
  async deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}