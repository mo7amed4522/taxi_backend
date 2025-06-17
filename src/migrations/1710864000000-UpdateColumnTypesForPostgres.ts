import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnTypesForPostgres1710864000000 implements MigrationInterface {
    name = 'UpdateColumnTypesForPostgres1710864000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Change announcement.userType from set to text[]
        await queryRunner.query(`ALTER TABLE "announcement" ADD "userType_new" text[] DEFAULT '{}'`);
        await queryRunner.query(`
            UPDATE "announcement" 
            SET "userType_new" = ARRAY(
                SELECT unnest(string_to_array(REPLACE(REPLACE("userType", '{', ''), '}', ''), ','))
            )
        `);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "userType"`);
        await queryRunner.query(`ALTER TABLE "announcement" RENAME COLUMN "userType_new" TO "userType"`);

        // Change feedback.score from tinyint to smallint
        await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "score" TYPE smallint`);

        // Change fleet.commissionSharePercent from tinyint to smallint
        await queryRunner.query(`ALTER TABLE "fleet" ALTER COLUMN "commissionSharePercent" TYPE smallint`);

        // Change service.prepayPercent from tinyint to smallint
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "prepayPercent" TYPE smallint`);

        // Change service.providerSharePercent from tinyint to smallint
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "providerSharePercent" TYPE smallint`);

        // Change media.base64 from longtext to text
        await queryRunner.query(`ALTER TABLE "media" ALTER COLUMN "base64" TYPE text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert media.base64 to longtext
        await queryRunner.query(`ALTER TABLE "media" ALTER COLUMN "base64" TYPE longtext`);

        // Revert service.providerSharePercent to tinyint
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "providerSharePercent" TYPE tinyint`);

        // Revert service.prepayPercent to tinyint
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "prepayPercent" TYPE tinyint`);

        // Revert fleet.commissionSharePercent to tinyint
        await queryRunner.query(`ALTER TABLE "fleet" ALTER COLUMN "commissionSharePercent" TYPE tinyint`);

        // Revert feedback.score to tinyint
        await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "score" TYPE tinyint`);

        // Revert announcement.userType to set
        await queryRunner.query(`ALTER TABLE "announcement" ADD "userType_old" set DEFAULT 'Rider'`);
        await queryRunner.query(`
            UPDATE "announcement" 
            SET "userType_old" = array_to_string("userType", ',')
        `);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "userType"`);
        await queryRunner.query(`ALTER TABLE "announcement" RENAME COLUMN "userType_old" TO "userType"`);
    }
} 