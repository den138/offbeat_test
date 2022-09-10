import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PromotionCategoryEntity } from '../promotion-category/promotion-category.entity';

@Entity('promotion')
export class PromotionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'description', type: 'varchar', nullable: false })
    description: string;

    @ManyToOne(
        () => PromotionCategoryEntity,
        (promotionCategory) => promotionCategory.promotion,
        { nullable: false, eager: true },
    )
    @JoinColumn({ name: 'promotion_category_id' })
    promotionCategory: PromotionCategoryEntity;

    @Column({ name: 'image_url_list', type: 'json', nullable: false })
    imageUrlList: string[];
}
