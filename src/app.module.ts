import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromotionModule } from './promotion/promotion.module';
import { PromotionCategoryModule } from './promotion-category/promotion-category.module';

@Module({
    imports: [PromotionModule, PromotionCategoryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
