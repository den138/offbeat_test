import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionCategoryController } from './promotion-category.controller';
import { PromotionCategory } from './promotion-category.entity';
import { PromotionCategoryService } from './promotion-category.service';

@Module({
    imports: [TypeOrmModule.forFeature([PromotionCategory])],
    controllers: [PromotionCategoryController],
    providers: [PromotionCategoryService],
})
export class PromotionCategoryModule {}
