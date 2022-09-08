import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';

@Module({
    imports: [],
    controllers: [PromotionController],
    providers: [PromotionService],
})
export class PromotionModule {}
