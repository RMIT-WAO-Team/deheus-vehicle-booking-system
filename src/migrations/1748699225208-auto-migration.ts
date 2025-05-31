import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1748699225208 implements MigrationInterface {
    name = 'AutoMigration1748699225208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "username" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD "password" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
    }

}
