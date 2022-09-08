import { Controller, Get } from '@nestjs/common';
import { IPromotion } from 'src/types/interface';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}

    @Get('/hello')
    getHello(): string {
        return this.promotionService.getHello();
    }

    @Get('/all')
    getAllPromotion(): Promise<IPromotion[]> {
        return this.promotionService.getAllPromotion();
    }
}
