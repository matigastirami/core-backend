import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { App, AppDocument } from '../apps/schema/app.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schema/company.schema';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private readonly companyModel: mongoose.Model<CompanyDocument>,
        //@InjectModel(App.name) private readonly appModel: mongoose.Model<AppDocument>
    ) {}

    async findById(id: string) {
        return this.companyModel.findById(id);
    }

    async findAll(filter: any = {}) {
        return this.companyModel.find(filter);
    }

    async create(createAppDto: CreateCompanyDto) {
        const created = new this.companyModel({ ...createAppDto });
        return created.save();
    }

    async update(id: string, updateAppDto: UpdateCompanyDto) {
        const updated = await this.companyModel.findByIdAndUpdate(id, updateAppDto);
        return updated;
    }

    async delete(id: string) {
        return this.companyModel.findByIdAndRemove(id);
    }

    async disable(id: string) {
        return this.companyModel.findByIdAndUpdate(id, { enabled: false });
    }

    async enable(id: string) {
        return this.companyModel.findByIdAndUpdate(id, { enabled: true });
    }

    /**
     * @method checkAppOwnership
     * @description Checks if a given enterprise is the owner of the appId sent as parameter
     * @param companyId The company _id to verify
     * @param appId  The app _id to verify
     */
    async checkAppOwnership(companyId: string, appId: string) {

        // TODO: Implement "company" field in appModel after creating the companies module
        //return this.appModel.findOne({ _id: appId, company: companyId });

        throw new Error('Not implemented')
    }
}
