import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionCategoryDto } from './dtos/create-promotion-category.dto';
import { PromotionCategoryController } from './promotion-category.controller';
import { PromotionCategoryEntity } from './promotion-category.entity';
import { PromotionCategory } from './promotion-category.interface';
import { PromotionCategoryService } from './promotion-category.service';

describe('PromotionCategoryController', () => {
    let promotionCategoryController: PromotionCategoryController;
    let promotionCategoryService: PromotionCategoryService;
    let res: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PromotionCategoryController],
            providers: [
                PromotionCategoryService,
                {
                    provide: getRepositoryToken(PromotionCategoryEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        promotionCategoryService = module.get<PromotionCategoryService>(
            PromotionCategoryService,
        );
        promotionCategoryController = module.get<PromotionCategoryController>(
            PromotionCategoryController,
        );

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
        expect(promotionCategoryController).toBeDefined();
        expect(promotionCategoryService).toBeDefined();
    });

    it('should return an array of promotion', async () => {
        const promotionCategoryResult: PromotionCategory[] = [
            {
                id: '12f7275f-116a-4cd0-a520-ff2514dc4270',
                name: 'All Meats',
                parentPromotionCategoryId:
                    '4c7af3eb-34c1-4ff4-af06-a62e788b7890',
                subCategoryCount: 0,
            },
            {
                id: '4bca5e18-e999-4be0-85c7-3862fd41859c',
                name: 'Top in Korea',
                parentPromotionCategoryId:
                    '424a663e-e96e-48c8-a2ae-b49215d2425a',
                subCategoryCount: 0,
            },
        ];

        jest.spyOn(
            promotionCategoryService,
            'getAllPromotionCategory',
        ).mockImplementation(async () => promotionCategoryResult);

        await promotionCategoryController.getAllPromotionCategory(res);

        expect(res.status).toBe(200);
        expect(res.data).toBe(promotionCategoryResult);
        expect(
            promotionCategoryService.getAllPromotionCategory,
        ).toBeCalledTimes(1);
        expect(res.message).toBe('Successfully get all promotion categories');
    });

    it('should return a promotion category', async () => {
        const promotionResult: PromotionCategory = {
            id: '4bca5e18-e999-4be0-85c7-3862fd41859c',
            name: 'Top in Korea',
            parentPromotionCategoryId: '424a663e-e96e-48c8-a2ae-b49215d2425a',
            subCategoryCount: 0,
        };

        jest.spyOn(
            promotionCategoryService,
            'getPromotionCategoryByID',
        ).mockImplementation(async () => promotionResult);

        await promotionCategoryController.getPromotionCategoryByID(1, res);

        expect(res.status).toBe(200);
        expect(res.data).toBe(promotionResult);
        expect(
            promotionCategoryService.getPromotionCategoryByID,
        ).toBeCalledTimes(1);
        expect(res.message).toBe('Successfully get promotion category');
    });

    it('should return error code and message', async () => {
        jest.spyOn(
            promotionCategoryService,
            'addPromotionCategory',
        ).mockImplementation(async () => {
            throw new Error('promotion category already exists');
        });

        const body = {} as CreatePromotionCategoryDto;

        await promotionCategoryController.addPromotionCategory(body, res);

        expect(res.status).toBe(500);
        expect(promotionCategoryService.addPromotionCategory).toBeCalledTimes(
            1,
        );
        expect(res.message).toBe(
            'Failed to create promotion category - promotion category already exists',
        );
    });
});
