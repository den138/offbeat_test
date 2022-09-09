import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PromotionCategory1662650203520 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'promotion_category',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'parent_promotion_category_id',
                        type: 'varchar',
                    },
                    {
                        name: 'sub_category_count',
                        type: 'int',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('promotion_category');
    }
}
