import { Company } from "../schema/company.schema";

export interface AddUserToCompanyDto {
    userId: string,
    companyId: Company
}