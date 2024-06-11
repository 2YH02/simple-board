import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718072743738 implements MigrationInterface {
    name = 'Migration1718072743738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "title" character varying NOT NULL`);
    }

}
