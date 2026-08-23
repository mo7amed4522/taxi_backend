import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOperatorRolePermissionsToTextArray1710864000009
  implements MigrationInterface
{
  name = 'ChangeOperatorRolePermissionsToTextArray1710864000009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operator_role" ALTER COLUMN "permissions" TYPE text[] USING array[permissions]::text[]`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operator_role" ALTER COLUMN "permissions" TYPE set`,
    );
  }
}
