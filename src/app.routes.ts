import { PromotionCategoryModule } from './modules/promotion-category/promotion-category.module';
import { PromotionModule } from './modules/promotion/promotion.module';

export const routes = [
    {
        path: 'api',
        module: PromotionModule,
    },
    {
        path: 'api',
        module: PromotionCategoryModule,
    },
];
