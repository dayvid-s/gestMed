import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1728857695255 implements MigrationInterface {
  name = 'Default1728857695255'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`scale_date\``);
    await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`scale_date\` date NULL`);
    await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP COLUMN \`scale_date\``);
    await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD \`scale_date\` date NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP COLUMN \`scale_date\``);
    await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD \`scale_date\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`duty_solicitation\` DROP COLUMN \`scale_date\``);
    await queryRunner.query(`ALTER TABLE \`duty_solicitation\` ADD \`scale_date\` int NULL`);
  }

}
