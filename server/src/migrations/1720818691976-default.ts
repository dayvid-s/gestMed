import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720818691976 implements MigrationInterface {
    name = 'Default1720818691976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP COLUMN \`scale_date\``);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD \`scale_date\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP COLUMN \`scale_date\``);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD \`scale_date\` date NOT NULL`);
    }

}
