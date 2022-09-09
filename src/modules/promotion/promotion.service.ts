import { Injectable } from '@nestjs/common';
import { Promotion } from './promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dtos/create-promotion.dto';
import { PromotionCategory } from '../promotion-category/promotion-category.entity';

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(Promotion)
        private promotionRepository: Repository<Promotion>,

        @InjectRepository(PromotionCategory)
        private promotionCategoryRepository: Repository<PromotionCategory>,
    ) {}

    async getAllPromotion(): Promise<Promotion[]> {
        return await this.promotionRepository.find();
    }

    // if return entity is null then throw error
    async getPromotionByID(id: string): Promise<Promotion> {
        if ((await this.promotionRepository.findOneBy({ id })) === null) {
            throw new Error('This promotion does not exist');
        }
        return await this.promotionRepository.findOneBy({ id });
    }

    async addPromotion(promotionData: CreatePromotionDto): Promise<Promotion> {
        const promotionCategory =
            await this.promotionCategoryRepository.findOne({
                where: { id: promotionData.promotionCategoryId },
            });

        const promotion = new Promotion();
        promotion.name = promotionData.name;
        promotion.description = promotionData.description;
        promotion.imageUrlList = promotionData.imageUrlList;
        promotion.promotionCategory = promotionCategory;

        const result = await this.promotionRepository.save(promotion);
        console.log(result);
        // promotionCategory.promotion.push(promotion);
        // await this.promotionCategoryRepository.save(promotionCategory);

        return await this.promotionRepository.save(promotion);
    }
}
