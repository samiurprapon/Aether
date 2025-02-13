import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUsersTable1728880102403 implements MigrationInterface {
	name = 'AlterUsersTable1728880102403';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`);
		await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "REL_8d3a07b8e994962efe57ebd0f2"`);
		await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "userId"`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "school" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "school" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "credentials" ADD "userId" uuid`);
		await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "REL_8d3a07b8e994962efe57ebd0f2" UNIQUE ("userId")`);
		await queryRunner.query(
			`ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
