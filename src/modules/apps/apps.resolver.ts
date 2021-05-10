import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, DateScalarMode } from '@nestjs/graphql';
import { JWTGqlAuthGuard } from '../auth/guards/jwt-graphql.guard';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { AppsService } from './apps.service';

@Resolver()
export class AppsResolver {

    constructor(private readonly appsService: AppsService){}

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('createApp')
    async create(@Args('input') input: CreateAppDto) {
        return this.appsService.create(input);
    }

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('updateApp')
    async update(@Args('id') id: string, @Args('input') input: UpdateAppDto) {
        return this.appsService.update(id, input);
    }

    @UseGuards(JWTGqlAuthGuard)
    @Query('app')
    async get(@Args('id') id: string) {
        return this.appsService.findById(id);
    }

    @UseGuards(JWTGqlAuthGuard)
    @Query('apps')
    async list() {
        return this.appsService.findAll();
    }

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('deleteApp')
    async delete(@Args('id') id: string) {
        return this.appsService.delete(id);
    } 
}
