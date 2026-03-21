"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsPaidToNews1777900000015 = void 0;
class AddIsPaidToNews1777900000015 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "news" ADD COLUMN "isPaid" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "isPaid"`);
    }
}
exports.AddIsPaidToNews1777900000015 = AddIsPaidToNews1777900000015;
//# sourceMappingURL=1777900000015-AddIsPaidToNews.js.map