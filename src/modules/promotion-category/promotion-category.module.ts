import { Module } from '@nestjs/common';
import { PromotionCategoryController } from './promotion-category.controller';
import { PromotionCategoryService } from './promotion-category.service';

@Module({
    imports: [],
    controllers: [PromotionCategoryController],
    providers: [PromotionCategoryService],
})
export class PromotionCategoryModule {}
