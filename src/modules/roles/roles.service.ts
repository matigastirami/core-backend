import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schema/role.schema';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private readonly roleModel: mongoose.Model<RoleDocument>,
    ) {}

    async findAll(filter: any = {}) {
        return this.roleModel.find({ ...filter });
    }

    async findById(id: string) {
        return this.roleModel.findById(id);
    }

    async create(createRoleDto: CreateRoleDto) {
        let created = new this.roleModel(createRoleDto);
        return created.save();
    }

    async update(id: string, data: UpdateRoleDto) {
        return this.roleModel.findByIdAndUpdate(id, { ...data });
    }

    async delete(id: string) {
        return this.roleModel.findByIdAndRemove(id);
    }
}
