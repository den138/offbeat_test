import { Test, TestingModule } from '@nestjs/testing';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { Response } from 'express';
import { Promotion } from './promotion.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PromotionEntity } from './promotion.entity';
import { Repository } from 'typeorm';
import { PromotionCategoryEntity } from '../promotion-category/promotion-category.entity';
import { CreatePromotionDto } from './dtos/create-promotion.dto';

describe('PromotionController', () => {
    let promotionController: PromotionController;
    let promotionService: PromotionService;
    let res: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PromotionController],
            providers: [
                PromotionService,
                {
                    provide: getRepositoryToken(PromotionEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(PromotionCategoryEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        promotionService = module.get<PromotionService>(PromotionService);
        promotionController =
            module.get<PromotionController>(PromotionController);

        res = {
            status: function (httpStatuscode: number) {
                this.status = httpStatuscode;
                return this;
            },

            json: function ({ message, data }) {
                this.message = message;
                this.data = data;
                return this;
            },
        } as unknown as Response;
    });

    it('should be defined', () => {
        expect(promotionController).toBeDefined();
        expect(promotionService).toBeDefined();
    });

    it('should return an array of promotion', async () => {
        const promotionResult: Promotion[] = [
            {
                id: '1',
                name: 'Hello 1',
                description: '<div>Hello<br/>This is nice!</div>',
                promotionCategoryId: '1',
                imageUrlList: [
                    'http://localhost:3000/assets/123.jpg',
                    'http://localhost:3000/assets/456.jpg',
                ],
            },
            {
                id: '2',
                name: 'Hello 2',
                description: '<div>Hello<br/>This is nice!</div>',
                promotionCategoryId: '2',
                imageUrlList: [
                    'http://localhost:3000/assets/123.jpg',
                    'http://localhost:3000/assets/456.jpg',
                ],
            },
        ];

        jest.spyOn(promotionService, 'getAllPromotion').mockImplementation(
            async () => promotionResult,
        );

        await promotionController.getAllPromotion(res);

        expect(res.status).toBe(200);
        expect(res.data).toBe(promotionResult);
        expect(promotionService.getAllPromotion).toBeCalledTimes(1);
        expect(res.message).toBe('Successfully get all promotion');
    });

    it('should return a promotion', async () => {
        const promotionResult: Promotion = {
            id: '1',
            name: 'Hello 1',
            description: '<div>Hello<br/>This is nice!</div>',
            promotionCategoryId: '1',
            imageUrlList: [
                'http://localhost:3000/assets/123.jpg',
                'http://localhost:3000/assets/456.jpg',
            ],
        };

        jest.spyOn(promotionService, 'getPromotionByID').mockImplementation(
            async () => promotionResult,
        );

        await promotionController.getPromotionByID(1, res);

        expect(res.status).toBe(200);
        expect(res.data).toBe(promotionResult);
        expect(promotionService.getPromotionByID).toBeCalledTimes(1);
        expect(res.message).toBe('Successfully get promotion');
    });

    it('should return error code and message', async () => {
        jest.spyOn(promotionService, 'addPromotion').mockImplementation(
            async () => {
                throw new Error('promotion already exists');
            },
        );

        const body = {} as CreatePromotionDto;

        await promotionController.addPromotion(body, res);

        expect(res.status).toBe(500);
        expect(promotionService.addPromotion).toBeCalledTimes(1);
        expect(res.message).toBe(
            'Failed to create promotion - promotion already exists',
        );
    });
});
