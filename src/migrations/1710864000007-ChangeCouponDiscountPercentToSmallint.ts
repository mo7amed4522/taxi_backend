import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCouponDiscountPercentToSmallint1710864000007 implements MigrationInterface {
    name = 'ChangeCouponDiscountPercentToSmallint1710864000007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "discountPercent" TYPE smallint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "discountPercent" TYPE tinyint`);
    }
} 