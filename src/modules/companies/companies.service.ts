import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { App, AppDocument } from '../apps/schema/app.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schema/company.schema';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private readonly companyModel: mongoose.Model<CompanyDocument>,
        //@InjectModel(App.name) private readonly appModel: mongoose.Model<AppDocument>
    ) {}

    async findById(_id: string, userId: String) {
        return this.companyModel.findOne({_id, user: userId});
    }

    async findAll(filter: any = {}, userId: String) {
        return this.companyModel.find({ ...filter, user: userId });
    }

    async create(createAppDto: CreateCompanyDto, userId: String) {
        const created = new this.companyModel({ ...createAppDto, user: userId });
        return created.save();
    }

    async update(_id: string, updateAppDto: UpdateCompanyDto, userId: String) {
        const updated = await this.companyModel.findOneAndUpdate({ _id, user: userId }, updateAppDto);
        return updated;
    }

    async delete(_id: string, userId: String) {
        return this.companyModel.findOneAndRemove({ _id, user: userId });
    }

    async disable(_id: string, userId: String) {
        return this.companyModel.findOneAndUpdate({ _id, user: userId }, { enabled: false });
    }

    async enable(_id: string, userId: String) {
        return this.companyModel.findOneAndUpdate({ _id, user: userId }, { enabled: true });
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
