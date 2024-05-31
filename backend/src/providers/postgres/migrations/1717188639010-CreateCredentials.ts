import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCredentials1717188639010 implements MigrationInterface {
	name = 'CreateCredentials1717188639010';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "credentials" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "deletedAt" TIMESTAMP, 
                "password" character varying NOT NULL, 
                CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id")
            )`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "credentials"`);
	}
}
