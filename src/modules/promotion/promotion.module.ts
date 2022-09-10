import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionCategoryEntity } from '../promotion-category/promotion-category.entity';
import { PromotionController } from './promotion.controller';
import { PromotionEntity } from './promotion.entity';
import { PromotionService } from './promotion.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PromotionEntity, PromotionCategoryEntity]),
    ],
    controllers: [PromotionController],
    providers: [PromotionService],
})
export class PromotionModule {}
