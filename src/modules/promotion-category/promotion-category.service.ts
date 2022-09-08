import { Injectable } from '@nestjs/common';

@Injectable()
export class PromotionCategoryService {
    getHello(): string {
        return 'Hello Promotion Category!';
    }
}
