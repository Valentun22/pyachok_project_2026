"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOAuthFieldsToUsers1777400000010 = void 0;
class AddOAuthFieldsToUsers1777400000010 {
    constructor() {
        this.name = 'AddOAuthFieldsToUsers1777400000010';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE "public"."users_oauthprovider_enum" AS ENUM (
        'google', 'facebook', 'google-play', 'app-store'
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "oauthProvider" "public"."users_oauthprovider_enum" NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "oauthId" text NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "password" DROP NOT NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "oauthId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "oauthProvider"`);
        await queryRunner.query(`DROP TYPE "public"."users_oauthprovider_enum"`);
    }
}
exports.AddOAuthFieldsToUsers1777400000010 = AddOAuthFieldsToUsers1777400000010;
//# sourceMappingURL=1777400000010-AddOAuthFieldsToUsers.js.map