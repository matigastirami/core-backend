import { Body, Controller, Get, Post, Param, Put, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    let updated = await this.usersService.updateUser(id, updateUserDto);

    if(!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    let updated = await this.usersService.deleteUser(id);

    if(!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async findAll(/*@Query('username') username: string, @Query('email') email: string*/): Promise<User[]> {
    return this.usersService.findAll();
  }

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
