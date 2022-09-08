import { Injectable } from '@nestjs/common';
import { Promotion } from './promotion.entity';
import { IPromotion } from 'src/types/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(Promotion)
        private promotionRepository: Repository<Promotion>,
    ) {}

    getHello(): string {
        return 'Hello Promotion!';
    }

    getAllPromotion(): Promise<IPromotion[]> {
        return this.promotionRepository.find();
    }
}
