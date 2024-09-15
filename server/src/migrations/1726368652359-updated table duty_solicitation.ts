import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726368652359 implements MigrationInterface {
    name = 'Default1726368652359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP FOREIGN KEY \`FK_8717f4cd254404f98ab3404b479\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`dutyId\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`scale_date\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`existentDutyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`shiftId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD CONSTRAINT \`FK_370168d60baaf610edd77185e97\` FOREIGN KEY (\`existentDutyId\`) REFERENCES \`main_scale_duty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD CONSTRAINT \`FK_e54c97b8a323ba0a9ae407f82d4\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP FOREIGN KEY \`FK_e54c97b8a323ba0a9ae407f82d4\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP FOREIGN KEY \`FK_370168d60baaf610edd77185e97\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`shiftId\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`existentDutyId\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`scale_date\``);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`dutyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD CONSTRAINT \`FK_8717f4cd254404f98ab3404b479\` FOREIGN KEY (\`dutyId\`) REFERENCES \`main_scale_duty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
