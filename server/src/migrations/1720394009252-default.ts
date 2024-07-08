import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720394009252 implements MigrationInterface {
    name = 'Default1720394009252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_shift_shift\` (\`userId\` int NOT NULL, \`shiftId\` int NOT NULL, INDEX \`IDX_bd21f0c15cee70815a9f2e851b\` (\`userId\`), INDEX \`IDX_cc0a31f0d83693a02efb3db6c1\` (\`shiftId\`), PRIMARY KEY (\`userId\`, \`shiftId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_shift_shift\` ADD CONSTRAINT \`FK_bd21f0c15cee70815a9f2e851be\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_shift_shift\` ADD CONSTRAINT \`FK_cc0a31f0d83693a02efb3db6c1e\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_shift_shift\` DROP FOREIGN KEY \`FK_cc0a31f0d83693a02efb3db6c1e\``);
        await queryRunner.query(`ALTER TABLE \`user_shift_shift\` DROP FOREIGN KEY \`FK_bd21f0c15cee70815a9f2e851be\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc0a31f0d83693a02efb3db6c1\` ON \`user_shift_shift\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd21f0c15cee70815a9f2e851b\` ON \`user_shift_shift\``);
        await queryRunner.query(`DROP TABLE \`user_shift_shift\``);
    }

}
