/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Client } from 'pg';
import dotenv from 'dotenv';
import format from 'pg-format';
import { logger } from '../logger';

dotenv.config();

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_HOST = 'localhost',
	POSTGRES_PORT,
	SUPERUSER,
	SUPERPASS,
} = process.env;

const DB_USER = POSTGRES_USER!;
const DB_PASSWORD = POSTGRES_PASSWORD!;
const DB_NAME = POSTGRES_DB!;

export async function setup() {
	const superClient = new Client({
		user: SUPERUSER,
		password: SUPERPASS,
		host: POSTGRES_HOST,
		port: Number(POSTGRES_PORT),
		database: 'postgres',
	});

	await superClient.connect();

	// 1. Создать пользователя при отсутствии
	const createUserQuery = format(
		`
		DO $$
		BEGIN
			IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = %L) THEN
				CREATE ROLE %I LOGIN PASSWORD %L;
			END IF;
		END$$;
	`,
		DB_USER,
		DB_USER,
		DB_PASSWORD,
	);

	await superClient.query(createUserQuery);

	// 2. Создать базу данных, если её нет
	const dbExists = await superClient.query(
		'SELECT 1 FROM pg_database WHERE datname = $1',
		[DB_NAME],
	);

	if (dbExists.rowCount === 0) {
		const createDbQuery = format(
			'CREATE DATABASE %I OWNER %I;',
			DB_NAME,
			DB_USER,
		);
		await superClient.query(createDbQuery);
		logger.info(`✅ База данных ${DB_NAME} создана`);
	} else {
		logger.info(`ℹ️ База данных ${DB_NAME} уже существует`);
	}

	await superClient.end();

	// 3. Подключение к новой БД для настройки схемы
	const dbClient = new Client({
		user: SUPERUSER,
		password: SUPERPASS,
		host: POSTGRES_HOST,
		port: 5432,
		database: DB_NAME,
	});

	await dbClient.connect();

	// 4. Передача прав и владения схемой `public`
	const grantPermissionsQuery = format(
		`
		ALTER SCHEMA public OWNER TO %I;
		GRANT ALL ON SCHEMA public TO %I;
		ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO %I;
		ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO %I;
	`,
		DB_USER,
		DB_USER,
		DB_USER,
		DB_USER,
	);

	await dbClient.query(grantPermissionsQuery);

	await dbClient.end();

	// 5. Проверка подключения под пользователем приложения
	const appClient = new Client({
		user: DB_USER,
		password: DB_PASSWORD,
		host: POSTGRES_HOST,
		port: 5432,
		database: DB_NAME,
	});
	try {
		await appClient.connect();
		logger.info('✅ Подключение к базе под пользователем прошло успешно');
	} catch (error) {
		logger.error(error);
	} finally {
		await appClient.end();
	}
}
