import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddPermissionDto } from './dto/add-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('permissions')
  @ApiBody({ type: AddPermissionDto })
  async addPermissionsToUser(@Body() addPermissionDto: AddPermissionDto) {
    await this.usersService.addPermissionToUser(addPermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('permissions')
  @ApiBody({ type: RemovePermissionDto })
  async removePermissionsToUser(@Body() removePermissionDto: RemovePermissionDto) {
    await this.usersService.removePermissionFromUser(removePermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/permissions')
  @ApiParam({ name: 'id', type: String })
  async getUserPermissions(@Param('id') userId: User) {
    return this.usersService.getUserPermissions(userId);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', type: String })
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    let updated = await this.usersService.updateUser(id, updateUserDto);

    if(!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  async delete(@Param('id') id) {
    let updated = await this.usersService.deleteUser(id);

    if(!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({ type: FilterUserDto, name: "filter" })
  @Get()
  async findAll(@Query() filter: FilterUserDto): Promise<User[]> {
    return this.usersService.findAll({ ...filter });
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String })
  @Put('password/:id')
  async changePassword(@Param('id') id: string, @Body() changePasswordDto: any) {
    try {
      let updated = await this.usersService.changeUserPassword(id, changePasswordDto.oldPassword, changePasswordDto.newPassword);

      if(!updated) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, Number(HttpStatus[error.message]));
    } 
  }
}
