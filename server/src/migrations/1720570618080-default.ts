import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720570618080 implements MigrationInterface {
    name = 'Default1720570618080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shift\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`specialization\` varchar(255) NULL, \`role\` varchar(255) NOT NULL, \`crm\` varchar(255) NULL, \`uf\` varchar(255) NULL, \`city\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`cpf\` varchar(255) NULL, \`rg\` varchar(255) NULL, \`address\` varchar(255) NULL, \`bank\` varchar(255) NULL, \`agency\` varchar(255) NULL, \`account\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shiftId\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`total_of_schedule_days\` int NOT NULL, \`is_auto_filled\` tinyint NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`doctor_duty\` (\`id\` int NOT NULL AUTO_INCREMENT, \`schedule_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`scheduleId\` int NULL, \`userId\` int NULL, \`shiftId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a54226f31d4d49cfdb6bced5d76\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_duty\` ADD CONSTRAINT \`FK_72924013fd94ce3f66f949f8141\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_duty\` ADD CONSTRAINT \`FK_5896efb6b4ba2023581b5eaf3a3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_duty\` ADD CONSTRAINT \`FK_c7974804bce3ff3e8847c4bca9c\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctor_duty\` DROP FOREIGN KEY \`FK_c7974804bce3ff3e8847c4bca9c\``);
        await queryRunner.query(`ALTER TABLE \`doctor_duty\` DROP FOREIGN KEY \`FK_5896efb6b4ba2023581b5eaf3a3\``);
        await queryRunner.query(`ALTER TABLE \`doctor_duty\` DROP FOREIGN KEY \`FK_72924013fd94ce3f66f949f8141\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a54226f31d4d49cfdb6bced5d76\``);
        await queryRunner.query(`DROP TABLE \`doctor_duty\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`shift\``);
    }

}
