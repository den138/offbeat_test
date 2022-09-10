import { Injectable } from '@nestjs/common';
import { PromotionEntity } from './promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dtos/create-promotion.dto';
import { PromotionCategoryEntity } from '../promotion-category/promotion-category.entity';
import { Promotion } from './promotion.interface';

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(PromotionEntity)
        private promotionRepository: Repository<PromotionEntity>,

        @InjectRepository(PromotionCategoryEntity)
        private promotionCategoryRepository: Repository<PromotionCategoryEntity>,
    ) {}

    async getAllPromotion(): Promise<Promotion[]> {
        const queryResult = await this.promotionRepository
            .createQueryBuilder('promotion')
            .select([
                'promotion.id AS id',
                'promotion.name AS name',
                'promotion.description AS description',
                'promotion.promotion_category_id AS promotionCategoryId',
                'promotion.image_url_list AS imageUrlList',
            ])
            .getRawMany();

        return queryResult;
    }

    // if return entity is null then throw error
    async getPromotionByID(id: string): Promise<Promotion> {
        if ((await this.promotionRepository.findOneBy({ id })) === null) {
            throw new Error('This promotion does not exist');
        }

        const queryResult = await this.promotionRepository
            .createQueryBuilder('promotion')
            .select([
                'promotion.id AS id',
                'promotion.name AS name',
                'promotion.description AS description',
                'promotion.promotion_category_id AS promotionCategoryId',
                'promotion.image_url_list AS imageUrlList',
            ])
            .where({ id })
            .getRawOne();

        return queryResult;
    }

    async addPromotion(
        promotionData: CreatePromotionDto,
    ): Promise<PromotionEntity> {
        // find promotion category by id, if it does not exist then throw error
        const promotionCategory =
            await this.promotionCategoryRepository.findOne({
                where: { id: promotionData.promotionCategoryId },
            });

        if (promotionCategory === null) {
            throw new Error('This promotion category does not exist');
        }

        // insert promotion into database
        const promotion = new PromotionEntity();
        promotion.name = promotionData.name;
        promotion.description = promotionData.description;
        promotion.imageUrlList = promotionData.imageUrlList;
        promotion.promotionCategory = promotionCategory;

        return await this.promotionRepository.save(promotion);
    }
}
