import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppsService } from "./apps.service";
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Controller('apps')
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createAppDto: CreateAppDto) {
        await this.appsService.create(createAppDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
        let updated = await this.appsService.update(id, updateAppDto);

        if(!updated) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        let found = await this.appsService.findById(id);

        if(!found) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list() {
        return this.appsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        let deleted = await this.appsService.delete(id);

        if(!deleted) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }
    }
}
