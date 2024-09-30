import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeDatabase1727720810567 implements MigrationInterface {
	name = 'InitializeDatabase1727720810567';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "password" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_8d3a07b8e994962efe57ebd0f2" UNIQUE ("userId"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "readings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "startsAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "endsAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "duration" integer NOT NULL DEFAULT '0', "userId" uuid, "materialId" uuid, CONSTRAINT "PK_a0f3aa79140b41884f2e53ba52a" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "materials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying(255) NOT NULL, "type" character varying(255), "url" character varying(255), "isPublic" boolean NOT NULL DEFAULT false, "courseId" character varying NOT NULL, CONSTRAINT "UQ_c4996878dc4dba6c010c7ca7767" UNIQUE ("courseId"), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "studentId" character varying(10), "userId" character varying NOT NULL, "usersId" uuid, CONSTRAINT "UQ_9d9f010d4d6a6eea8b4779638c4" UNIQUE ("studentId"), CONSTRAINT "UQ_e0208b4f964e609959aff431bf9" UNIQUE ("userId"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDropped" boolean NOT NULL DEFAULT false, "courseId" uuid, "studentId" uuid, CONSTRAINT "UQ_1566a16b6323a3e3ade31a02c9b" UNIQUE ("courseId", "studentId"), CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`CREATE TYPE "public"."courses_semester_enum" AS ENUM('SPRING', 'SUMMER', 'FALL')`);
		await queryRunner.query(
			`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "status" character varying NOT NULL, "courseCode" character varying(10) NOT NULL, "section" character varying NOT NULL, "enrollCode" character varying, "semester" "public"."courses_semester_enum" NOT NULL DEFAULT 'SPRING', "year" smallint NOT NULL DEFAULT '2024', "isArchived" boolean NOT NULL DEFAULT false, "instructorId" uuid, CONSTRAINT "UQ_caff351784c023555f5fe5f7c57" UNIQUE ("courseCode", "section", "semester", "year"), CONSTRAINT "UQ_914be0daec61d2a5fba8b50ec25" UNIQUE ("id", "instructorId"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "initial" character varying(10), "userId" uuid NOT NULL, CONSTRAINT "UQ_f0c6778db5beea86c99010748f9" UNIQUE ("initial"), CONSTRAINT "UQ_4d8041cbc103a5142fa2f2afad4" UNIQUE ("userId"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`CREATE TYPE "public"."users_sex_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying(11) NOT NULL, "sex" "public"."users_sex_enum" NOT NULL DEFAULT 'MALE', "school" character varying NOT NULL, "isBan" boolean NOT NULL DEFAULT false, "credentialId" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541" UNIQUE ("credentialId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`CREATE TYPE "public"."roles_type_enum" AS ENUM('STUDENT', 'TEACHER', 'AUTHORITY', 'ADMIN')`);
		await queryRunner.query(`CREATE TYPE "public"."roles_level_enum" AS ENUM('ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE')`);
		await queryRunner.query(
			`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" "public"."roles_type_enum" NOT NULL DEFAULT 'STUDENT', "level" "public"."roles_level_enum" NOT NULL DEFAULT 'ONE', "userId" character varying NOT NULL, CONSTRAINT "UQ_c8db5603420d119933bbc5c398c" UNIQUE ("userId"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "readings" ADD CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "readings" ADD CONSTRAINT "FK_57fe71df1f3bd4d27b410185f7f" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "students" ADD CONSTRAINT "FK_e0adebbacbd0dc6ae30df66e0f6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6714597bea722629fa7d32124a" FOREIGN KEY ("instructorId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "teachers" ADD CONSTRAINT "FK_4d8041cbc103a5142fa2f2afad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_4d8041cbc103a5142fa2f2afad4"`);
		await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6714597bea722629fa7d32124a"`);
		await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd"`);
		await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8"`);
		await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_e0adebbacbd0dc6ae30df66e0f6"`);
		await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_57fe71df1f3bd4d27b410185f7f"`);
		await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255"`);
		await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`);
		await queryRunner.query(`DROP TABLE "roles"`);
		await queryRunner.query(`DROP TYPE "public"."roles_level_enum"`);
		await queryRunner.query(`DROP TYPE "public"."roles_type_enum"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TYPE "public"."users_sex_enum"`);
		await queryRunner.query(`DROP TABLE "teachers"`);
		await queryRunner.query(`DROP TABLE "courses"`);
		await queryRunner.query(`DROP TYPE "public"."courses_semester_enum"`);
		await queryRunner.query(`DROP TABLE "enrollments"`);
		await queryRunner.query(`DROP TABLE "students"`);
		await queryRunner.query(`DROP TABLE "materials"`);
		await queryRunner.query(`DROP TABLE "readings"`);
		await queryRunner.query(`DROP TABLE "credentials"`);
	}
}
