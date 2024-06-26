import { MigrationInterface, QueryRunner } from "typeorm";

export class ScaleInsertions1719358654143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scale_insertions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`schedule_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`scheduleId\` int NULL, \`userId\` int NULL, \`shiftId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`scale_insertions\` ADD CONSTRAINT \`FK_c0d9d66a6466bdca49f8255bd95\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scale_insertions\` ADD CONSTRAINT \`FK_490994187754cef89252d43c11f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scale_insertions\` ADD CONSTRAINT \`FK_5cdb073c192ce3239c54fa25b1e\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scale_insertions\` DROP FOREIGN KEY \`FK_5cdb073c192ce3239c54fa25b1e\``);
        await queryRunner.query(`ALTER TABLE \`scale_insertions\` DROP FOREIGN KEY \`FK_490994187754cef89252d43c11f\``);
        await queryRunner.query(`ALTER TABLE \`scale_insertions\` DROP FOREIGN KEY \`FK_c0d9d66a6466bdca49f8255bd95\``);
        await queryRunner.query(`DROP TABLE \`scale_insertions\``);
        
    }

}
