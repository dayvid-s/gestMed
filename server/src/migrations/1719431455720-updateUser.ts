import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1719431455720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`specialization\` \`specialization\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`specialization\` \`specialization\` varchar(255) NOT NULL`);
    }

}
