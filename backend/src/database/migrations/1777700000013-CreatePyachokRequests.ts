import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePyachokRequests1777700000013 implements MigrationInterface {
  name = 'CreatePyachokRequests1777700000013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "pyachok_request_status_enum" AS ENUM ('open', 'closed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "pyachok_request_genderpreference_enum" AS ENUM ('any', 'male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TYPE "pyachok_request_payer_enum" AS ENUM ('any', 'me', 'split', 'other')`,
    );

    await queryRunner.query(`
      CREATE TABLE "pyachok_request" (
        "id"          uuid        NOT NULL DEFAULT uuid_generate_v4(),
        "created"     TIMESTAMP   NOT NULL DEFAULT now(),
        "updated"     TIMESTAMP   NOT NULL DEFAULT now(),

        "date"        date        NOT NULL,
        "time"        time        NOT NULL,
        "purpose"     text,
        "peopleCount" integer,
        "genderPreference" "pyachok_request_genderpreference_enum",
        "payer"       "pyachok_request_payer_enum",
        "expectedBudget" integer,
        "message"     text,
        "status"      "pyachok_request_status_enum" NOT NULL DEFAULT 'open',

        "user_id"     uuid        NOT NULL,
        "venue_id"    uuid        NOT NULL,

        CONSTRAINT "PK_pyachok_request_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_pyachok_request_user"  FOREIGN KEY ("user_id")  REFERENCES "users"("id")  ON DELETE CASCADE,
        CONSTRAINT "FK_pyachok_request_venue" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`CREATE INDEX "IDX_pyachok_request_user_id"  ON "pyachok_request" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_pyachok_request_venue_id" ON "pyachok_request" ("venue_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_pyachok_request_status"   ON "pyachok_request" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_pyachok_request_date"     ON "pyachok_request" ("date")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_pyachok_request_date"`);
    await queryRunner.query(`DROP INDEX "IDX_pyachok_request_status"`);
    await queryRunner.query(`DROP INDEX "IDX_pyachok_request_venue_id"`);
    await queryRunner.query(`DROP INDEX "IDX_pyachok_request_user_id"`);
    await queryRunner.query(`DROP TABLE "pyachok_request"`);
    await queryRunner.query(`DROP TYPE "pyachok_request_payer_enum"`);
    await queryRunner.query(`DROP TYPE "pyachok_request_genderpreference_enum"`);
    await queryRunner.query(`DROP TYPE "pyachok_request_status_enum"`);
  }
}