import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionCategory } from '../promotion-category/promotion-category.entity';
import { PromotionController } from './promotion.controller';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';

@Module({
    imports: [TypeOrmModule.forFeature([Promotion, PromotionCategory])],
    controllers: [PromotionController],
    providers: [PromotionService],
})
export class PromotionModule {}
