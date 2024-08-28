import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1724800656309 implements MigrationInterface {
    name = 'Default1724800656309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`solicitation_of_duty\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('in progress', 'rejected', 'approved') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`dutyId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`solicitation_of_duty\` ADD CONSTRAINT \`FK_9caa588c0d887d315c60caea86f\` FOREIGN KEY (\`dutyId\`) REFERENCES \`main_scale_duty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`solicitation_of_duty\` ADD CONSTRAINT \`FK_a4b65ea972713c635881da67328\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`solicitation_of_duty\` DROP FOREIGN KEY \`FK_a4b65ea972713c635881da67328\``);
        await queryRunner.query(`ALTER TABLE \`solicitation_of_duty\` DROP FOREIGN KEY \`FK_9caa588c0d887d315c60caea86f\``);
        await queryRunner.query(`DROP TABLE \`solicitation_of_duty\``);
    }

}
