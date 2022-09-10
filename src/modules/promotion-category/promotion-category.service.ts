import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { PromotionCategoryEntity } from './promotion-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromotionCategoryDto } from './dtos/create-promotion-category.dto';

@Injectable()
export class PromotionCategoryService {
    constructor(
        @InjectRepository(PromotionCategoryEntity)
        private promotionCategoryRepository: Repository<PromotionCategoryEntity>,
    ) {}

    async getAllPromotionCategory(): Promise<PromotionCategoryEntity[]> {
        return await this.promotionCategoryRepository.find();
    }

    // if return entity is null then throw error
    async getPromotionCategoryByID(
        id: string,
    ): Promise<PromotionCategoryEntity> {
        const promotionCategory =
            await this.promotionCategoryRepository.findOneBy({ id });
        if (promotionCategory === null) {
            throw new Error('This promotion category does not exist');
        }
        return promotionCategory;
    }

    async addPromotionCategory(
        promotionCategoryData: CreatePromotionCategoryDto,
    ): Promise<PromotionCategoryEntity> {
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
