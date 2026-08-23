import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAnnouncementUserTypeToTextArray1710864000000
  implements MigrationInterface
{
  name = 'ChangeAnnouncementUserTypeToTextArray1710864000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, create a temporary column
    await queryRunner.query(
      `ALTER TABLE "announcement" ADD "userType_new" text[] DEFAULT '{}'`,
    );

    // Copy data from old column to new column, converting set values to array
    await queryRunner.query(`
            UPDATE "announcement" 
            SET "userType_new" = ARRAY(
                SELECT unnest(string_to_array(REPLACE(REPLACE("userType", '{', ''), '}', ''), ','))
            )
        `);

    // Drop the old column
    await queryRunner.query(
      `ALTER TABLE "announcement" DROP COLUMN "userType"`,
    );

    // Rename the new column to the original name
    await queryRunner.query(
      `ALTER TABLE "announcement" RENAME COLUMN "userType_new" TO "userType"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // First, create a temporary column
    await queryRunner.query(
      `ALTER TABLE "announcement" ADD "userType_old" set DEFAULT 'Rider'`,
    );

    // Copy data from array column to set column
    await queryRunner.query(`
            UPDATE "announcement" 
            SET "userType_old" = array_to_string("userType", ',')
        `);

    // Drop the array column
    await queryRunner.query(
      `ALTER TABLE "announcement" DROP COLUMN "userType"`,
    );

    // Rename the old column back to original name
    await queryRunner.query(
      `ALTER TABLE "announcement" RENAME COLUMN "userType_old" TO "userType"`,
    );
  }
}
