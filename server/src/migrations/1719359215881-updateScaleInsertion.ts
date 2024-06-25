import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateScaleInsertion1719359215881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE scaleinsertions TO scale_insertion`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE scale_insertion TO scaleinsertions`);
    }

}
