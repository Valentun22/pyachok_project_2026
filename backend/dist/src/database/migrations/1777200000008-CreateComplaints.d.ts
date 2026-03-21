import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateComplaints1777200000008 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
