"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailVerification1777900000016 = void 0;
class AddEmailVerification1777900000016 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "isEmailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "emailVerifyToken" text`);
        await queryRunner.query(`UPDATE "users" SET "isEmailVerified" = true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerifyToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailVerified"`);
    }
}
exports.AddEmailVerification1777900000016 = AddEmailVerification1777900000016;
//# sourceMappingURL=1777900000016-AddEmailVerification.js.map