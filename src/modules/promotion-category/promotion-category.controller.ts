import { Controller, Get } from '@nestjs/common';
import { PromotionCategoryService } from './promotion-category.service';

@Controller('promotion-category')
export class PromotionCategoryController {
    constructor(
        private readonly promotionCategoryService: PromotionCategoryService,
    ) {}

    @Get()
    getHello(): string {
        return this.promotionCategoryService.getHello();
    }
}
