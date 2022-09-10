import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { PromotionCategoryService } from './promotion-category.service';
import { CreatePromotionCategoryDto } from './dtos/create-promotion-category.dto';
import { Response } from 'express';

@Controller('api/promotion-category')
export class PromotionCategoryController {
    constructor(
        private readonly promotionCategoryService: PromotionCategoryService,
    ) {}

    // try to get all promotion categories from database
    // if success, return status code 200 and all promotion category entities
    // if fail, return status code 500 and error message
    @Get('all')
    async getAllPromotionCategory(@Res() res: Response) {
        try {
            const promotionCategories =
                await this.promotionCategoryService.getAllPromotionCategory();

            res.status(HttpStatus.OK).json({
                message: 'Successfully get all promotion categories',
                data: promotionCategories,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failed to get all promotion categories - ${error.message}`,
            });
        }
    }

    @Get('all/tree-node-json')
    async getAllPromotionCategoryTreeNodeJson(@Res() res: Response) {
        try {
            const promotionCategories =
                await this.promotionCategoryService.getAllPromotionCategory();

            const subPromotionCategories = promotionCategories.filter(
                (promotionCategory) =>
                    promotionCategory.parentPromotionCategoryId !== null,
            );

            const parentPromotionCategories = promotionCategories.filter(
                (promotionCategory) =>
                    promotionCategory.parentPromotionCategoryId === null,
            );

            for (const promotionCategory of parentPromotionCategories) {
                const children = (promotionCategory['children'] = []);

                for (const subPromotionCategory of subPromotionCategories) {
                    if (
                        promotionCategory.id ===
                        subPromotionCategory.parentPromotionCategoryId
                    ) {
                        delete subPromotionCategory[
                            'parentPromotionCategoryId'
                        ];
                        delete subPromotionCategory['subCategoryCount'];
                        children.push(subPromotionCategory);
                    }
                }
            }

            res.status(HttpStatus.OK).json({
                message: 'Successfully get all promotion categories',
                data: parentPromotionCategories,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failed to get all promotion categories - ${error.message}`,
            });
        }
    }

    // try to get promotion category by id from database
    // if success, return status code 200 and promotion category entity
    // if fail, return status code 500 and error message
    @Get(':id')
    async getPromotionCategoryByID(@Param() params, @Res() res: Response) {
        try {
            const promotionCategoryId = params.id;

            const promotionCategory =
                await this.promotionCategoryService.getPromotionCategoryByID(
                    promotionCategoryId,
                );

            res.status(HttpStatus.OK).json({
                message: 'Successfully get promotion category',
                data: promotionCategory,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failed to get promotion category - ${error.message}`,
            });
        }
    }

    // try to insert a promotion category into database
    // if success, return status code 200 and inserted promotion category entity
    // if fail, return status code 500 and error message
    @Post()
    async addPromotionCategory(
        @Body() body: CreatePromotionCategoryDto,
        @Res() res: Response,
    ) {
        try {
            const promotionCategory =
                await this.promotionCategoryService.addPromotionCategory(body);

            res.status(HttpStatus.OK).json({
                message: 'Successfully create promotion category',
                data: promotionCategory,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failed to create promotion category - ${error.message}`,
            });
        }
    }
}
