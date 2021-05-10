import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, DateScalarMode } from '@nestjs/graphql';
import { JWTGqlAuthGuard } from '../auth/guards/jwt-graphql.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Resolver()
export class RolesResolver {

    constructor(private readonly rolesService: RolesService){}

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('createRole')
    async create(@Args('input') input: CreateRoleDto) {
        console.log(input)
        return this.rolesService.create(input);
    }

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('updateRole')
    async update(@Args('id') id: string, @Args('input') input: UpdateRoleDto) {
        return this.rolesService.update(id, input);
    }

    @UseGuards(JWTGqlAuthGuard)
    @Query('role')
    async get(@Args('id') id: string) {
        return this.rolesService.findById(id);
    }

    @UseGuards(JWTGqlAuthGuard)
    @Query('roles')
    async list() {
        return this.rolesService.findAll();
    }

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('deleteRole')
    async delete(@Args('id') id: string) {
        return this.rolesService.delete(id);
    } 
}
