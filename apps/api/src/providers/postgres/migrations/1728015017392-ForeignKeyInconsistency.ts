import { MigrationInterface, QueryRunner } from 'typeorm';

export class ForeignKeyInconsistency1728015017392 implements MigrationInterface {
	name = 'ForeignKeyInconsistency1728015017392';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255"`);
		await queryRunner.query(`ALTER TABLE "readings" RENAME COLUMN "userId" TO "studentId"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credentialId"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "credentialId" uuid NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541" UNIQUE ("credentialId")`);
		await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_c8db5603420d119933bbc5c398c"`);
		await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "userId"`);
		await queryRunner.query(`ALTER TABLE "roles" ADD "userId" uuid NOT NULL`);
		await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_c8db5603420d119933bbc5c398c" UNIQUE ("userId")`);
		await queryRunner.query(
			`ALTER TABLE "readings" ADD CONSTRAINT "FK_1f4e4978456044008267034cff0" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "roles" ADD CONSTRAINT "FK_c8db5603420d119933bbc5c398c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_c8db5603420d119933bbc5c398c"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`);
		await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_1f4e4978456044008267034cff0"`);
		await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_c8db5603420d119933bbc5c398c"`);
		await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "userId"`);
		await queryRunner.query(`ALTER TABLE "roles" ADD "userId" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_c8db5603420d119933bbc5c398c" UNIQUE ("userId")`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credentialId"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "credentialId" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541" UNIQUE ("credentialId")`);
		await queryRunner.query(`ALTER TABLE "readings" RENAME COLUMN "studentId" TO "userId"`);
		await queryRunner.query(
			`ALTER TABLE "readings" ADD CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
