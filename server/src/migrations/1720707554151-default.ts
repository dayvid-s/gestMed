import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720707554151 implements MigrationInterface {
    name = 'Default1720707554151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`model_scale_duty\` (\`id\` int NOT NULL AUTO_INCREMENT, \`scale_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`scaleId\` int NULL, \`userId\` int NULL, \`shiftId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD CONSTRAINT \`FK_163fe71eae5d8ff27b548c9329d\` FOREIGN KEY (\`scaleId\`) REFERENCES \`model_scale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD CONSTRAINT \`FK_88300d347742b08873f5eefbed8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD CONSTRAINT \`FK_f334b5a02cb9d8a5d079510cde7\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP FOREIGN KEY \`FK_f334b5a02cb9d8a5d079510cde7\``);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP FOREIGN KEY \`FK_88300d347742b08873f5eefbed8\``);
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP FOREIGN KEY \`FK_163fe71eae5d8ff27b548c9329d\``);
        await queryRunner.query(`DROP TABLE \`model_scale_duty\``);
    }

}
