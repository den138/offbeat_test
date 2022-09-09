import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PromotionCategory } from '../promotion-category/promotion-category.entity';

@Entity()
export class Promotion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'description', type: 'varchar', nullable: false })
    description: string;

    @ManyToOne(
        () => PromotionCategory,
        (promotionCategory) => promotionCategory.promotion,
        { nullable: false },
    )
    @JoinColumn({ name: 'promotion_category_id' })
    promotionCategory: PromotionCategory;

    @Column({ name: 'image_url_list', type: 'json', nullable: false })
    imageUrlList: string[];
}
