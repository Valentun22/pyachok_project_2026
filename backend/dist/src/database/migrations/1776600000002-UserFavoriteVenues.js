"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFavoriteVenues1776600000002 = void 0;
class UserFavoriteVenues1776600000002 {
    constructor() {
        this.name = 'UserFavoriteVenues1776600000002';
    }
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "user_favorite_venues" (
                                                              "user_id" uuid NOT NULL,
                                                              "venue_id" uuid NOT NULL,
                                                              CONSTRAINT "PK_user_favorite_venues" PRIMARY KEY ("user_id", "venue_id"),
            CONSTRAINT "FK_fav_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_fav_venue" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE
            )
    `);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_fav_user_id" ON "user_favorite_venues" ("user_id")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_fav_venue_id" ON "user_favorite_venues" ("venue_id")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "user_favorite_venues"`);
    }
}
exports.UserFavoriteVenues1776600000002 = UserFavoriteVenues1776600000002;
//# sourceMappingURL=1776600000002-UserFavoriteVenues.js.map