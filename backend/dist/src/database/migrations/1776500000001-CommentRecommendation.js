"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRecommendation1776500000001 = void 0;
class CommentRecommendation1776500000001 {
    constructor() {
        this.name = 'CommentRecommendation1776500000001';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."comments_recommendation_enum" AS ENUM('recommend','not_recommend')`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "recommendation" "public"."comments_recommendation_enum"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "recommendation"`);
        await queryRunner.query(`DROP TYPE "public"."comments_recommendation_enum"`);
    }
}
exports.CommentRecommendation1776500000001 = CommentRecommendation1776500000001;
//# sourceMappingURL=1776500000001-CommentRecommendation.js.map