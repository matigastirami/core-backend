import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() createAppDto: CreateCompanyDto) {
        return this.companiesService.create(createAppDto, req.user._id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Request() req, @Param('id') id: string, @Body() updateAppDto: UpdateCompanyDto) {
        let updated = await this.companiesService.update(id, updateAppDto, req.user._id);

        if(!updated) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return updated;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Request() req, @Param('id') id: string) {
        let found = await this.companiesService.findById(id, req.user._id);

        if(!found) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Request() req) {
        return this.companiesService.findAll({ ...(req.query ?? {}) }, req.user._id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string) {
        let deleted = await this.companiesService.delete(id, req.user._id);

        if(!deleted) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return deleted;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('disable/:id')
    async disable(@Request() req, @Param('id') id: string) {
        let disabled = await this.companiesService.disable(id, req.user._id);

        if(!disabled) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return disabled;
    }

    @UseGuards(JwtAuthGuard)
    @Put('enable/:id')
    async enable(@Request() req, @Param('id') id: string) {
        let enabled = await this.companiesService.enable(id, req.user._id);

        if(!enabled) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return enabled;
    }

    @UseGuards(JwtAuthGuard)
    @Post('user')
    async addUserToCompany(@Body() addUserToCompanyDto: AddUserToCompanyDto) {
        const { userId, companyId } = addUserToCompanyDto;
        const enabled = await this.companiesService.addUserToCompany(companyId, userId);

        if(!enabled) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return enabled;
    }
}
