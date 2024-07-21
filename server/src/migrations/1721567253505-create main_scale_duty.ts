import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721567253505 implements MigrationInterface {
    name = 'Default1721567253505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`main_scale_duty\` (\`id\` int NOT NULL AUTO_INCREMENT, \`scale_date\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`scaleId\` int NULL, \`userId\` int NULL, \`shiftId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`main_scale\` DROP COLUMN \`is_auto_filled\``);
        await queryRunner.query(`ALTER TABLE \`main_scale_duty\` ADD CONSTRAINT \`FK_71bf72fa925b61c478bd0101f54\` FOREIGN KEY (\`scaleId\`) REFERENCES \`main_scale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`main_scale_duty\` ADD CONSTRAINT \`FK_7735f1f798234fc53a569a954a5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`main_scale_duty\` ADD CONSTRAINT \`FK_24603889268d0af00ee00654d61\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`main_scale_duty\` DROP FOREIGN KEY \`FK_24603889268d0af00ee00654d61\``);
        await queryRunner.query(`ALTER TABLE \`main_scale_duty\` DROP FOREIGN KEY \`FK_7735f1f798234fc53a569a954a5\``);
        await queryRunner.query(`ALTER TABLE \`main_scale_duty\` DROP FOREIGN KEY \`FK_71bf72fa925b61c478bd0101f54\``);
        await queryRunner.query(`ALTER TABLE \`main_scale\` ADD \`is_auto_filled\` tinyint NULL`);
        await queryRunner.query(`DROP TABLE \`main_scale_duty\``);
    }

}
