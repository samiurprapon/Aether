import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServerLog1717194809707 implements MigrationInterface {
	name = 'CreateServerLog1717194809707';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`server_logs\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`message\` text NOT NULL, \`server\` text NOT NULL, \`url\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE \`server_logs\``);
	}
}
