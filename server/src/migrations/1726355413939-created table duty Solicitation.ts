import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726355413939 implements MigrationInterface {
    name = 'Default1726355413939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`duty_solicitation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('in progress', 'rejected', 'approved') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`dutyId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD CONSTRAINT \`FK_8717f4cd254404f98ab3404b479\` FOREIGN KEY (\`dutyId\`) REFERENCES \`main_scale_duty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD CONSTRAINT \`FK_c3222ece5458e6a9f8b10f85089\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP FOREIGN KEY \`FK_c3222ece5458e6a9f8b10f85089\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP FOREIGN KEY \`FK_8717f4cd254404f98ab3404b479\``);
        await queryRunner.query(`DROP TABLE \`duty_solicitation\``);
    }

}
