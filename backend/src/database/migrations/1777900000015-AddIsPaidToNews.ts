import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsPaidToNews1777900000015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ADD COLUMN "isPaid" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "isPaid"`);
  }
}