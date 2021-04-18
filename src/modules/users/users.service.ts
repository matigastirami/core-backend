import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Hash from '../../helpers/hash';
import { AddPermissionDto } from './dto/add-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<UserDocument>,
    @InjectModel(Permission.name) private readonly permissionModel: mongoose.Model<PermissionDocument>,
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
    const createdUser = new this.userModel({
      ...createUserDto,
      password: await Hash.hashString(
        createUserDto.password,
        process.env.HASHING_ROUNDS,
      ),
    });
    return createdUser.save();
  }

  async findAll(filter: any = {}) {
    return this.userModel.find(filter);
  }

  async addPermissionToUser(addPermissionDto: AddPermissionDto) {
    //First check for the existence of this permission
    const { userId, app, roles } = addPermissionDto;
    const existing = await this.permissionModel.findOne({ userId, app });

    if(existing){

      for (const role of roles) {

        if(!existing.roles.includes(role)) {
          existing.roles.push(role);
        }
      }

      let id = existing._id;
      delete existing._id;

      return this.permissionModel.findByIdAndUpdate(id, { ...existing });
    }

    const created = new this.permissionModel(addPermissionDto);

    return created.save();
  }

  async removePermissionFromUser(removePermissionDto: RemovePermissionDto) {
    //First check for the existence of this permission
    const { userId, app, roles } = removePermissionDto;
    const existing = await this.permissionModel.findOne({ userId, app });

    if(!existing){
      throw new Error("NOT_FOUND:The permission you are trying to delete does not exist");
    }

    // If the user didn't inform the roles to remove, then it means it wants to delete the whole permissions for an specific app
    // Else, the procedure is to eliminate only the requested permissions
    if(!roles) {
      return this.permissionModel.remove({ userId, app }).lean();
    }
    else {
      return this.permissionModel.findByIdAndUpdate(existing._id, { $pull: { roles: { $in: roles } } })
    }
    
  }

  async getUserPermissions(userId: User) {
    return this.permissionModel.find({ userId })
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(id, data);
    return updated;
  }

  async deleteUser(id: string) {
    const deleted = await this.userModel.findByIdAndRemove(id);
    return deleted;
  }

  async changeUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const existing = await this.userModel.findById(id);

    if (!existing) {
      throw new Error('404');
    }

    if (!(await Hash.compare(oldPassword, existing.password))) {
      throw new Error('400');
    }

    return existing.update({
      password: await Hash.hashString(
        newPassword,
        Number(process.env.HASHING_ROUNDS),
      ),
    });
  }
}
