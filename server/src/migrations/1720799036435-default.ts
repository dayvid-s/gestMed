import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720799036435 implements MigrationInterface {
    name = 'Default1720799036435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model_scale_duty\` DROP COLUMN \`updated_at\``);
    }

}
