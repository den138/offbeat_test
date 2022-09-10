import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Promotion', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all promotion', () => {
        return request(app.getHttpServer())
            .get('/api/promotion/all')
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
            });
    });

    it('/GET promotion by wrong ID', () => {
        return request(app.getHttpServer())
            .get('/api/promotion/hello')
            .expect(500)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
