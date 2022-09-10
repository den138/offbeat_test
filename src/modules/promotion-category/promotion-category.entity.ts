import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PromotionEntity } from '../promotion/promotion.entity';

@Entity('promotion_category')
export class PromotionCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({
        name: 'parent_promotion_category_id',
        type: 'varchar',
        nullable: true,
    })
    parentPromotionCategoryId: string;

    @Column({ name: 'sub_category_count', type: 'int', nullable: false })
    subCategoryCount: number;

    @OneToMany(
        () => PromotionEntity,
        (promotion) => promotion.promotionCategory,
    )
    promotion: PromotionEntity[];

    children?: PromotionCategoryEntity[];
}
