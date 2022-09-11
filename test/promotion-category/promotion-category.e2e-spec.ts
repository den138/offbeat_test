import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('PromotionCategory', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all promotion categories', () => {
        return request(app.getHttpServer())
            .get('/api/promotion-category/all')
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
            });
    });

    it('/GET promotion category by wrong ID', () => {
        return request(app.getHttpServer())
            .get('/api/promotion-category/hello')
            .expect(500)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
            });
    });

    it('/POST promotion category by missing parts of request payload', () => {
        return request(app.getHttpServer())
            .post('/api/promotion-category')
            .send({ name: 'hello' })
            .expect(500)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
