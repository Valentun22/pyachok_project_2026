"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppSettings1777500000011 = void 0;
class CreateAppSettings1777500000011 {
    constructor() {
        this.name = 'CreateAppSettings1777500000011';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "app_settings" (
        "key"       text NOT NULL,
        "value"     text,
        "updatedAt" text,
        CONSTRAINT "PK_app_settings_key" PRIMARY KEY ("key")
      )
    `);
        await queryRunner.query(`
      INSERT INTO "app_settings" ("key", "value") VALUES
        ('about_title', 'Про нас'),
        ('about_text', 'Пиячок — це сучасний сервіс для пошуку закладів, перегляду відгуків та планування зустрічей.'),
        ('contact_phone', '+380 XX XXX XX XX'),
        ('contact_email', 'info@pyachok.com'),
        ('contact_address', 'Україна')
      ON CONFLICT ("key") DO NOTHING
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "app_settings"`);
    }
}
exports.CreateAppSettings1777500000011 = CreateAppSettings1777500000011;
//# sourceMappingURL=1777500000011-CreateAppSettings.js.map