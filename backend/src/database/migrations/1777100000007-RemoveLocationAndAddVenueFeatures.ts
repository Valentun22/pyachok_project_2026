import { MigrationInterface, QueryRunner } from 'typeorm';

import { TableNameEnum } from '../entities/enums/table-name.enum';

export class RemoveLocationAndAddVenueFeatures1777100000007
  implements MigrationInterface
{
  name = 'RemoveLocationAndAddVenueFeatures1777100000007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_be677afd59218cba25e6e38789"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${TableNameEnum.VENUES}" DROP COLUMN IF EXISTS "location"`,
    );

    await queryRunner.query(
      `ALTER TABLE "${TableNameEnum.VENUES}" ADD COLUMN IF NOT EXISTS "hasParking" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "${TableNameEnum.VENUES}" ADD COLUMN IF NOT EXISTS "liveMusic" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${TableNameEnum.VENUES}" DROP COLUMN IF EXISTS "liveMusic"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${TableNameEnum.VENUES}" DROP COLUMN IF EXISTS "hasParking"`,
    );
  }
}
