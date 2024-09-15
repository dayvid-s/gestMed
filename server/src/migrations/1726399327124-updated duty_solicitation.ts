import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726399327124 implements MigrationInterface {
    name = 'Default1726399327124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`message\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`message\``);
    }

}
