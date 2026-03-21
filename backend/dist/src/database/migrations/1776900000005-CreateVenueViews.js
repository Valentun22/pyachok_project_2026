"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVenueViews1776900000005 = void 0;
const table_name_enum_1 = require("../entities/enums/table-name.enum");
class CreateVenueViews1776900000005 {
    constructor() {
        this.name = 'CreateVenueViews1776900000005';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "${table_name_enum_1.TableNameEnum.VENUE_VIEWS}" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created" TIMESTAMP NOT NULL DEFAULT now(),
        "updated" TIMESTAMP NOT NULL DEFAULT now(),

        "venue_id" uuid NOT NULL,
        "user_id" uuid NULL,
        "ip" text NULL,
        "userAgent" text NULL,

        CONSTRAINT "PK_venue_views_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_venue_views_venue" FOREIGN KEY ("venue_id")
          REFERENCES "${table_name_enum_1.TableNameEnum.VENUES}"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_venue_views_user" FOREIGN KEY ("user_id")
          REFERENCES "${table_name_enum_1.TableNameEnum.USERS}"("id") ON DELETE SET NULL
      )
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_venue_views_venue_created"
      ON "${table_name_enum_1.TableNameEnum.VENUE_VIEWS}" ("venue_id", "created")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_venue_views_user_created"
      ON "${table_name_enum_1.TableNameEnum.VENUE_VIEWS}" ("user_id", "created")
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "${table_name_enum_1.TableNameEnum.VENUE_VIEWS}"`);
    }
}
exports.CreateVenueViews1776900000005 = CreateVenueViews1776900000005;
//# sourceMappingURL=1776900000005-CreateVenueViews.js.map