import * as request from 'supertest';
import { Test } from '@nestjs/testing';
//import { CompaniesModule } from '../src/modules/companies/companies.module';
//import { CompaniesService } from '../src/modules/companies/companies.service';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Company } from '../src/modules/companies/schema/company.schema';
import { AppModule } from '../src/app.module';
import { companyServiceMock } from './mock/company.mock';
import { JwtAuthGuard } from '../src/modules/auth/guards/jwt-auth.guard';
import { CompaniesService } from '../src/modules/companies/companies.service';


describe('Companies', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {
          provide: getModelToken(Company.name),
          useValue: [
            {
              "_id" : "609c5f8c3bbbee3508e4afe8",
              "enabled" : true,
              "name" : "Test Corp",
              "description" : "This is a test",
              "createdAt" : new Date("2021-05-12T23:06:52.993Z"),
              "updatedAt" : new Date("2021-05-12T23:06:52.993Z"),
              "__v" : 0
            }
          ],
          inject: [Company.name]
        }
      ]
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(CompaniesService)
      .useValue(companyServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET companies`, () => {
    return request(app.getHttpServer())
      .get('/companies')
      .expect(200)
      .expect(
        res => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              ...companyServiceMock.findAll({})
            ])
          );
        }
      );
  });

  it(`/GET companyById`, () => {
    return request(app.getHttpServer())
      .get(`/companies/609c5f8c3bbbee3508e4afe8`)
      .expect(200)
      .expect(
        res => {
          expect(res.body).toEqual(companyServiceMock.findById('609c5f8c3bbbee3508e4afe8'));
        }
      );
  });

  it(`/POST createCompany (With minimun required fields)`, () => {
    return request(app.getHttpServer())
      .post(`/companies`)
      .send({
        "name": `E2E test company ${Date.now()}`,
        "description": "E2E test company"
      })
      .expect(201)
  });

  it(`/PUT updateCompany`, () => {
    return request(app.getHttpServer())
      .put(`/companies/609c5f8c3bbbee3508e4afe8`)
      .send({
        "name": `Testing Corp ${Date.now()}`,
        "description": "This is a test updated",
        "page_url": "https://this.is.a.test.com/test"
      })
      .expect(200)
  });

  it(`/DELETE company`, () => {
    return request(app.getHttpServer())
      .delete(`/companies/609c5f8c3bbbee3508e4afe8`)
      .expect(200)
  });

  it(`/DELETE disable company`, () => {
    return request(app.getHttpServer())
      .delete(`/companies/disable/609c5f8c3bbbee3508e4afe8`)
      .expect(200)
  });

  it(`/PUT enable company`, () => {
    return request(app.getHttpServer())
      .put(`/companies/enable/609c5f8c3bbbee3508e4afe8`)
      .expect(200)
  });

  afterAll(async () => {
    await app.close();
  });
});