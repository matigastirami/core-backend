import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppsService } from "./apps.service";
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@ApiTags('Apps')
@Controller('apps')
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createAppDto: CreateAppDto, @Headers('companyId') companyId) {
        await this.appsService.create(createAppDto, companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto, @Headers('companyId') companyId) {
        let updated = await this.appsService.update(id, updateAppDto, companyId);

        if(!updated) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string, @Headers('companyId') companyId) {
        let found = await this.appsService.findById(id, companyId);

        if(!found) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Headers('companyId') companyId) {
        return this.appsService.findAll({}, companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Headers('companyId') companyId) {
        let deleted = await this.appsService.delete(id, companyId);

        if(!deleted) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }
    }
}
