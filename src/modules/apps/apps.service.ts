import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App, AppDocument } from './schema/app.schema';

@Injectable()
export class AppsService {
    constructor(@InjectModel(App.name) private readonly appModel: mongoose.Model<AppDocument>) {}

    async findById(id: string) {
        return this.appModel.findById(id);
    }

    async findAll(filter: any = {}) {
        return this.appModel.find(filter);
    }

    async create(createAppDto: CreateAppDto) {
        const created = new this.appModel({ ...createAppDto });
        return created.save();
    }

    async update(id: string, updateAppDto: UpdateAppDto) {
        const updated = await this.appModel.findByIdAndUpdate(id, updateAppDto);
        return updated;
    }

    async delete(id: string) {
        return this.appModel.findByIdAndRemove(id);
    }
}
