import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1719973690235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`crm\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`uf\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cpf\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`rg\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`bank\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`agency\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`account\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`account\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`agency\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bank\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`rg\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cpf\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`uf\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`crm\``);
    }

}
