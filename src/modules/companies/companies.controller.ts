import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createAppDto: CreateCompanyDto) {
        return this.companiesService.create(createAppDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAppDto: UpdateCompanyDto) {
        let updated = await this.companiesService.update(id, updateAppDto);

        if(!updated) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return updated;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        let found = await this.companiesService.findById(id);

        if(!found) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
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
    async delete(@Param('id') id: string) {
        let deleted = await this.companiesService.delete(id);

        if(!deleted) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return deleted;
    }

    @Delete('disable/:id')
    async disable(@Param('id') id: string) {
        let disabled = await this.companiesService.disable(id);

        if(!disabled) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return disabled;
    }

    @Put('enable/:id')
    async enable(@Param('id') id: string) {
        let enabled = await this.companiesService.enable(id);

        if(!enabled) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return enabled;
    }
}
