import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JWTGqlAuthGuard } from '../auth/guards/jwt-graphql.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Resolver()
export class CompaniesResolver {
    constructor(private readonly companiesService: CompaniesService){}

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('createCompany')
    async create(@Args('input') input: CreateCompanyDto) {
        return this.companiesService.create(input, '1234');
    }

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('updateCompany')
    async update(@Args('id') id: string, @Args('input') input: UpdateCompanyDto) {
        return this.companiesService.update(id, input, '1234');
    }

    @UseGuards(JWTGqlAuthGuard)
    @Query('company')
    async get(@Args('id') id: string) {
        return this.companiesService.findById(id, '1234');
    }

    @UseGuards(JWTGqlAuthGuard)
    @Query('companies')
    async list() {
        return this.companiesService.findAll({}, '1234');
    }

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('deleteCompany')
    async delete(@Args('id') id: string) {
        return this.companiesService.delete(id, '1234');
    } 

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('')
    async disableCompany(@Args('id') id: string) {
        return this.companiesService.disable(id, '1234');
    } 

    @UseGuards(JWTGqlAuthGuard)
    @Mutation('')
    async enableCompany(@Args('id') id: string) {
        return this.companiesService.enable(id, '1234');
    } 
}
