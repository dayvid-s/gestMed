import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1728843353261 implements MigrationInterface {
  name = 'Default1728843353261'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE \`main_scale_duty\` DROP COLUMN \`scale_date\``);
    await queryRunner.query(`ALTER TABLE \`main_scale_duty\` ADD \`scale_date\` date NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`main_scale_duty\` DROP COLUMN \`scale_date\``);
    await queryRunner.query(`ALTER TABLE \`main_scale_duty\` ADD \`scale_date\` int NOT NULL`);
  }

}
