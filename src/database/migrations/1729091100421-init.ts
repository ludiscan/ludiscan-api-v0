import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1729091100421 implements MigrationInterface {
    name = 'Init1729091100421';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "player_position_logs" ADD "player" integer NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "player_position_logs" DROP COLUMN "player"`,
        );
    }
}
