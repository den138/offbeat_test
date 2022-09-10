import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Response } from 'express';
import { CreatePromotionDto } from './dtos/create-promotion.dto';

@Controller('api/promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}

    // try to get all promotion from database
    // if success, return status code 200 and all promotion entities
    // if fail, return status code 500 and error message
    @Get('all')
    async getAllPromotion(@Res() res: Response) {
        try {
            const promotion = await this.promotionService.getAllPromotion();

            res.status(HttpStatus.OK).json({
                message: 'Successfully get all promotion',
                data: promotion,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error getting all promotion',
            });
        }
    }

    // try to get promotion by id from database
    // if success, return status code 200 and promotion entity
    // if fail, return status code 500 and error message
    @Get(':id')
    async getPromotionByID(@Param() params, @Res() res: Response) {
        try {
            const promotionId = params.id;

            const promotion = await this.promotionService.getPromotionByID(
                promotionId,
            );

            res.status(HttpStatus.OK).json({
                message: 'Successfully get promotion',
                data: promotion,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failed to get promotion - ${error.message}`,
            });
        }
    }

    // try to insert a promotion into database
    // if success, return status code 200 and inserted promotion entity
    // if fail, return status code 500 and error message
    @Post()
    async addPromotion(@Body() body: CreatePromotionDto, @Res() res: Response) {
        try {
            const promotion = await this.promotionService.addPromotion(body);

            res.status(HttpStatus.OK).json({
                message: 'Successfully create promotion',
                data: promotion,
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: `Failed to create promotion - ${error.message}`,
            });
        }
    }
}
