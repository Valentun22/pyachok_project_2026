import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessages1777800000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "messages"
        (
            "id"           uuid      NOT NULL DEFAULT uuid_generate_v4(),
            "created"      TIMESTAMP NOT NULL DEFAULT now(),
            "updated"      TIMESTAMP NOT NULL DEFAULT now(),
            "text"         text      NOT NULL,
            "isRead"       boolean   NOT NULL DEFAULT false,
            "sender_id"    uuid      NOT NULL,
            "recipient_id" uuid      NOT NULL,
            "pyachok_id"   uuid,
            CONSTRAINT "PK_messages" PRIMARY KEY ("id"),
            CONSTRAINT "FK_messages_sender" FOREIGN KEY ("sender_id") REFERENCES "users" ("id") ON DELETE CASCADE,
            CONSTRAINT "FK_messages_recipient" FOREIGN KEY ("recipient_id") REFERENCES "users" ("id") ON DELETE CASCADE,
            CONSTRAINT "FK_messages_pyachok" FOREIGN KEY ("pyachok_id") REFERENCES "pyachok_request" ("id") ON DELETE SET NULL
        )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_messages_recipient" ON "messages" ("recipient_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_messages_sender" ON "messages" ("sender_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "messages"`);
  }
}
