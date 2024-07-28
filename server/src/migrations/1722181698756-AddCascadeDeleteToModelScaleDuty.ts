import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1722181698756 implements MigrationInterface {
    name = 'Default1722181698756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP FOREIGN KEY \`FK_163fe71eae5d8ff27b548c9329d\``);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD CONSTRAINT \`FK_163fe71eae5d8ff27b548c9329d\` FOREIGN KEY (\`scaleId\`) REFERENCES \`model_scale\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP FOREIGN KEY \`FK_163fe71eae5d8ff27b548c9329d\``);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD CONSTRAINT \`FK_163fe71eae5d8ff27b548c9329d\` FOREIGN KEY (\`scaleId\`) REFERENCES \`model_scale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
