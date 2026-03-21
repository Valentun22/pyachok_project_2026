import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailVerification1777900000016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "isEmailVerified" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "emailVerifyToken" text`,
    );
    await queryRunner.query(
      `UPDATE "users" SET "isEmailVerified" = true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerifyToken"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailVerified"`);
  }
}