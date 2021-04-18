import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Hash from "../../helpers/hash";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async findOneById(id: string) {
    return this.userModel.findById(id);
  }

  async findOneByUserName(username: string) {
    return this.userModel.findOne({ username });
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({...createUserDto, password: await Hash.hashString(createUserDto.password, process.env.HASHING_ROUNDS)});
    return createdUser.save();
  }

  async findAll(filter: any = {}) {
    return this.userModel.find(filter);
  }

  // TODO: Implement this method after implementing the role and app modules
  async addPermissionToUser() {}

  async updateUser(id: string, data: UpdateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(id, data);
    return updated;
  }

  async deleteUser(id: string) {
    const deleted = await this.userModel.findByIdAndRemove(id);
    return deleted;
  }

  async changeUserPassword(id: string, oldPassword: string, newPassword: string) {
    const existing = await this.userModel.findById(id);

    if(!existing) {
      throw new Error("404");
    }

    if(!(await Hash.compare(oldPassword, existing.password))) {
      throw new Error("400");
    }

    return existing.update({ password: await Hash.hashString(newPassword, Number(process.env.HASHING_ROUNDS)) })
  }
}
