import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721510876627 implements MigrationInterface {
    name = 'Default1721510876627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`main_scale\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total_of_scale_days\` int NOT NULL, \`is_auto_filled\` tinyint NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`main_scale\``);
    }

}
