import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1719361780152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`especialization\` \`specialization\` varchar(255) NOT NULL`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`specialization\``);
    }

}
