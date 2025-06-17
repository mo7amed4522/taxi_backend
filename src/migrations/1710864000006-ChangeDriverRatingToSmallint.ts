import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDriverRatingToSmallint1710864000006 implements MigrationInterface {
    name = 'ChangeDriverRatingToSmallint1710864000006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "rating" TYPE smallint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "rating" TYPE tinyint`);
    }
} 