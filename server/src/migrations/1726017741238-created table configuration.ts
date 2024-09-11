import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726017741238 implements MigrationInterface {
    name = 'Default1726017741238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`configuration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`should_cordinator_aprove_duties\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`configuration\``);
    }

}
