"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDefaultRoleToUsers1777000000006 = void 0;
class AddDefaultRoleToUsers1777000000006 {
    constructor() {
        this.name = 'AddDefaultRoleToUsers1777000000006';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE users
      ALTER COLUMN role
      SET DEFAULT ARRAY['user']::users_role_enum[];
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE users
      ALTER COLUMN role
      DROP DEFAULT;
    `);
    }
}
exports.AddDefaultRoleToUsers1777000000006 = AddDefaultRoleToUsers1777000000006;
//# sourceMappingURL=1777000000006-AddDefaultRoleToUsers.js.map