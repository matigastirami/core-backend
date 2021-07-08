import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Company } from '../companies/schema/company.schema';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App, AppDocument } from './schema/app.schema';

@Injectable()
export class AppsService {
    constructor(@InjectModel(App.name) private readonly appModel: mongoose.Model<AppDocument>) {}

    async findById(_id: string, company: Company) {
        return this.appModel.findOne({ _id: _id, company: company }).populate('company');
    }

    async findAll(filter: any = {}, company: Company) {
        return this.appModel.find({ ...filter, company: company }).populate('company');
    }

    async create(createAppDto: CreateAppDto, company: Company) {
        const created = new this.appModel({ ...createAppDto, company });
        return created.save();
    }

    async update(id: string, updateAppDto: UpdateAppDto, company: Company) {
        const updated = await this.appModel.findOneAndUpdate({ _id: id, company: company }, updateAppDto);
        return updated;
    }

    async delete(_id: string, company: Company) {
        return this.appModel.findOneAndRemove({ _id: _id, company: company });
    }
}
