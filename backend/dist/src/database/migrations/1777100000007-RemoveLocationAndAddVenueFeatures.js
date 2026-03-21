"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveLocationAndAddVenueFeatures1777100000007 = void 0;
const table_name_enum_1 = require("../entities/enums/table-name.enum");
class RemoveLocationAndAddVenueFeatures1777100000007 {
    constructor() {
        this.name = 'RemoveLocationAndAddVenueFeatures1777100000007';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_be677afd59218cba25e6e38789"`);
        await queryRunner.query(`ALTER TABLE "${table_name_enum_1.TableNameEnum.VENUES}" DROP COLUMN IF EXISTS "location"`);
        await queryRunner.query(`ALTER TABLE "${table_name_enum_1.TableNameEnum.VENUES}" ADD COLUMN IF NOT EXISTS "hasParking" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "${table_name_enum_1.TableNameEnum.VENUES}" ADD COLUMN IF NOT EXISTS "liveMusic" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "${table_name_enum_1.TableNameEnum.VENUES}" DROP COLUMN IF EXISTS "liveMusic"`);
        await queryRunner.query(`ALTER TABLE "${table_name_enum_1.TableNameEnum.VENUES}" DROP COLUMN IF EXISTS "hasParking"`);
    }
}
exports.RemoveLocationAndAddVenueFeatures1777100000007 = RemoveLocationAndAddVenueFeatures1777100000007;
//# sourceMappingURL=1777100000007-RemoveLocationAndAddVenueFeatures.js.map