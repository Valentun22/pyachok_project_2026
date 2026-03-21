"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserProfileFields1777600000012 = void 0;
class AddUserProfileFields1777600000012 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users"
        ADD COLUMN IF NOT EXISTS "birthdate"   DATE         NULL,
        ADD COLUMN IF NOT EXISTS "city"        TEXT         NULL,
        ADD COLUMN IF NOT EXISTS "gender"      TEXT         NULL,
        ADD COLUMN IF NOT EXISTS "instagram"   TEXT         NULL,
        ADD COLUMN IF NOT EXISTS "interests"   TEXT         NULL;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users"
        DROP COLUMN IF EXISTS "birthdate",
        DROP COLUMN IF EXISTS "city",
        DROP COLUMN IF EXISTS "gender",
        DROP COLUMN IF EXISTS "instagram",
        DROP COLUMN IF EXISTS "interests";
    `);
    }
}
exports.AddUserProfileFields1777600000012 = AddUserProfileFields1777600000012;
//# sourceMappingURL=1777600000012-AddUserProfileFields.js.map