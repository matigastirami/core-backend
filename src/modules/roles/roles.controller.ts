import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        await this.rolesService.create(createRoleDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        let updated = await this.rolesService.update(id, updateRoleDto);

        if(!updated) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        let found = await this.rolesService.findById(id);

        if(!found) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list() {
        return this.rolesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        let deleted = await this.rolesService.delete(id);

        if(!deleted) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
    }
}
