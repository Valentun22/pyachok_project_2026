import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsPaidToNews1777900000015 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
