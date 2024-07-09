import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720523977563 implements MigrationInterface {
    name = 'Default1720523977563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`shiftId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a54226f31d4d49cfdb6bced5d76\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a54226f31d4d49cfdb6bced5d76\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`shiftId\``);
    }

}
