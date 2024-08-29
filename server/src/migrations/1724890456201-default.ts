import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1724890456201 implements MigrationInterface {
    name = 'Default1724890456201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` varchar(50) NULL, \`priority\` varchar(50) NULL, \`referenceId\` int NULL, \`referenceType\` varchar(255) NULL, \`viewed_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`dutyId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_e6dd117aa81b835e53b69537c4d\` FOREIGN KEY (\`dutyId\`) REFERENCES \`main_scale_duty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_e6dd117aa81b835e53b69537c4d\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
