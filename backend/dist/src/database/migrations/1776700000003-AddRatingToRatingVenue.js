"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRatingToRatingVenue1776700000003 = void 0;
const table_name_enum_1 = require("../entities/enums/table-name.enum");
class AddRatingToRatingVenue1776700000003 {
    constructor() {
        this.name = 'AddRatingToRatingVenue1776700000003';
    }
    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE "${table_name_enum_1.TableNameEnum.RATING_VENUE}"
            ADD COLUMN IF NOT EXISTS "rating" int NOT NULL DEFAULT 10
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'CHK_rating_1_10'
        ) THEN
          ALTER TABLE "${table_name_enum_1.TableNameEnum.RATING_VENUE}"
          ADD CONSTRAINT "CHK_rating_1_10" CHECK ("rating" >= 1 AND "rating" <= 10);
        END IF;
      END $$;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE "${table_name_enum_1.TableNameEnum.RATING_VENUE}" DROP CONSTRAINT IF EXISTS "CHK_rating_1_10"
    `);
        await queryRunner.query(`
        ALTER TABLE "${table_name_enum_1.TableNameEnum.RATING_VENUE}" DROP COLUMN IF EXISTS "rating"
    `);
    }
}
exports.AddRatingToRatingVenue1776700000003 = AddRatingToRatingVenue1776700000003;
//# sourceMappingURL=1776700000003-AddRatingToRatingVenue.js.map