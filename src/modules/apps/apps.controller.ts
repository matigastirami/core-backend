import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { AppsService } from "./apps.service";
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Controller('apps')
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    @Post()
    async create(@Body() createAppDto: CreateAppDto) {
        await this.appsService.create(createAppDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
        let updated = await this.appsService.update(id, updateAppDto);

        if(!updated) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        let found = await this.appsService.findById(id);

        if(!found) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Get()
    async list() {
        return this.appsService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        let deleted = await this.appsService.delete(id);

        if(!deleted) {
            throw new HttpException('App not found', HttpStatus.NOT_FOUND);
        }
    }
}
