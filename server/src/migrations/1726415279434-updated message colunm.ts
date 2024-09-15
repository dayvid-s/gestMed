import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726415279434 implements MigrationInterface {
    name = 'Default1726415279434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`message\` varchar(900) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`message\` varchar(50) NULL`);
    }

}
