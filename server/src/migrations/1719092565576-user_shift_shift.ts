import { MigrationInterface, QueryRunner } from "typeorm";

export class UserShiftShift1719092565576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`user_shifts_shift\` (\`userId\` int NOT NULL, \`shiftId\` int NOT NULL, INDEX \`IDX_97c5349f3a20a04ebc0cd18b74\` (\`userId\`), INDEX \`IDX_427b9cb9d268d5c30e12c12b9b\` (\`shiftId\`), PRIMARY KEY (\`userId\`, \`shiftId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_shifts_shift\` ADD CONSTRAINT \`FK_97c5349f3a20a04ebc0cd18b740\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_shifts_shift\` ADD CONSTRAINT \`FK_427b9cb9d268d5c30e12c12b9b2\` FOREIGN KEY (\`shiftId\`) REFERENCES \`shift\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_shifts_shift\` DROP FOREIGN KEY \`FK_427b9cb9d268d5c30e12c12b9b2\``);
        await queryRunner.query(`ALTER TABLE \`user_shifts_shift\` DROP FOREIGN KEY \`FK_97c5349f3a20a04ebc0cd18b740\``);
        await queryRunner.query(`DROP INDEX \`IDX_427b9cb9d268d5c30e12c12b9b\` ON \`user_shifts_shift\``);
        await queryRunner.query(`DROP INDEX \`IDX_97c5349f3a20a04ebc0cd18b74\` ON \`user_shifts_shift\``);
        await queryRunner.query(`DROP TABLE \`user_shifts_shift\``);
    }

}
