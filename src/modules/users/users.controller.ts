import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddPermissionDto } from './dto/add-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('permissions')
  async addPermissionsToUser(@Body() addPermissionDto: AddPermissionDto) {
    await this.usersService.addPermissionToUser(addPermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('permissions')
  async removePermissionsToUser(@Body() removePermissionDto: RemovePermissionDto) {
    await this.usersService.removePermissionFromUser(removePermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/permissions')
  async getUserPermissions(@Param('id') userId: User) {
    return this.usersService.getUserPermissions(userId);
  }

  @Post()
  @ApiBody({ type: [CreateUserDto] })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({ type: [UpdateUserDto] })
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    let updated = await this.usersService.updateUser(id, updateUserDto);

    if(!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id) {
    let updated = await this.usersService.deleteUser(id);

    if(!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(/*@Query('username') username: string, @Query('email') email: string*/): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
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
