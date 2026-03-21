import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddDefaultRoleToUsers1777000000006 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
