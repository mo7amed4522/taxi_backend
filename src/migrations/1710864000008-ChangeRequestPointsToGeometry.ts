import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRequestPointsToGeometry1710864000008
  implements MigrationInterface
{
  name = 'ChangeRequestPointsToGeometry1710864000008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "points" TYPE geometry`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "directions" TYPE geometry`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "points" TYPE multipoint`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "directions" TYPE multipoint`,
    );
  }
}
