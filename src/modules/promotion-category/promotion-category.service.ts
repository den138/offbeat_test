import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { PromotionCategory } from './promotion-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromotionCategoryDto } from './dtos/create-promotion-category.dto';

@Injectable()
export class PromotionCategoryService {
    constructor(
        @InjectRepository(PromotionCategory)
        private promotionCategoryRepository: Repository<PromotionCategory>,
    ) {}

    async getAllPromotionCategory(): Promise<PromotionCategory[]> {
        return await this.promotionCategoryRepository.find();
    }

    // if return entity is null then throw error
    async getPromotionCategoryByID(id: string): Promise<PromotionCategory> {
        if (
            (await this.promotionCategoryRepository.findOneBy({ id })) === null
        ) {
            throw new Error('This promotion category does not exist');
        }
        return await this.promotionCategoryRepository.findOneBy({ id });
    }

    async addPromotionCategory(
        promotionCategoryData: CreatePromotionCategoryDto,
    ): Promise<PromotionCategory> {
        const promotionCategoryName = promotionCategoryData.name;

        // Search if there is a duplicate promotion category name in database
        // if yes, throw exception back to controller
        if (
            (await this.promotionCategoryRepository.findOne({
                where: { name: promotionCategoryName },
            })) !== null
        ) {
            throw new Error('Promotion category already exists');
        }

        return await this.promotionCategoryRepository.save(
            promotionCategoryData,
        );
    }
}
