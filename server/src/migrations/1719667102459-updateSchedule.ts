import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchedule1719667102459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`total_of_schedule_days\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`is_auto_filled\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`is_auto_filled\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`total_of_schedule_days\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`end_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`start_date\` date NOT NULL`);
    }

}
