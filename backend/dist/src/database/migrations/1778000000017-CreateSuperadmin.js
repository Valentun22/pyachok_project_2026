"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSuperadmin1778000000017 = void 0;
const bcrypt = require("bcrypt");
class CreateSuperadmin1778000000017 {
    async up(queryRunner) {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        if (!email || !password) {
            console.warn('[Migration] ADMIN_EMAIL або ADMIN_PASSWORD не задані — суперадміна не створено.');
            return;
        }
        const existing = await queryRunner.query(`SELECT id FROM users WHERE email = $1`, [email]);
        if (existing.length > 0) {
            console.log(`[Migration] Користувач ${email} вже існує — пропускаємо.`);
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await queryRunner.query(`INSERT INTO users (name, email, password, role, "isEmailVerified")
       VALUES ($1, $2, $3, ARRAY['superadmin']::users_role_enum[], true)`, ['Admin', email, hashedPassword]);
        console.log(`[Migration] Суперадміна ${email} створено успішно.`);
    }
    async down(queryRunner) {
        const email = process.env.ADMIN_EMAIL;
        if (email) {
            await queryRunner.query(`DELETE FROM users WHERE email = $1`, [email]);
        }
    }
}
exports.CreateSuperadmin1778000000017 = CreateSuperadmin1778000000017;
//# sourceMappingURL=1778000000017-CreateSuperadmin.js.map