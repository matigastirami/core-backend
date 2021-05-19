import { CompaniesService } from "../../src/modules/companies/companies.service";

const mockDoc = {
    "_id" : "609c5f8c3bbbee3508e4afe8",
    "enabled" : true,
    "name" : "Test Corp",
    "description" : "This is a test",
    "createdAt" : "2021-05-12T23:06:52.993Z",
    "updatedAt" : "2021-05-12T23:06:52.993Z",
    "__v" : 0
};

export const companyServiceMock = {

    findAll(filter) {
        return [
            mockDoc
        ];
    },

    findById(id) {
        return mockDoc;
    },

    create(data) {
        return mockDoc;
    },

    update(id, data) {
        return mockDoc;
    },

    delete(id) {
        return mockDoc;
    },

    disable(id) {
        return mockDoc;
    },
    
    enable(id) {
        return mockDoc;
    },

    checkAppOwnership(companyId, appId) {
        return null;
    }
} 