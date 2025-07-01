// src/db/setup.ts

import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_PORT,
	SUPERUSER,
	SUPERPASS,
} = process.env;

const DB_USER = POSTGRES_USER;
const DB_PASSWORD = POSTGRES_PASSWORD;
const DB_NAME = POSTGRES_DB;

export async function setup() {
	const superClient = new Client({
		user: SUPERUSER,
		password: SUPERPASS,
		host: 'localhost',
		port: Number(POSTGRES_PORT),
		database: 'postgres',
	});

	await superClient.connect();

	// 1. Создать пользователя при отсутствии
	await superClient.query(`
		DO $$
		BEGIN
			IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
				CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASSWORD}';
			END IF;
		END$$;
	`);

	// 2. Создать базу данных, если её нет
	const dbExists = await superClient.query(
		'SELECT 1 FROM pg_database WHERE datname = $1',
		[DB_NAME],
	);

	if (dbExists.rowCount === 0) {
		await superClient.query(`CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};`);
		console.log(`✅ База данных ${DB_NAME} создана`);
	} else {
		console.log(`ℹ️ База данных ${DB_NAME} уже существует`);
	}

	await superClient.end();

	// 3. Подключение к новой БД для настройки схемы
	const dbClient = new Client({
		user: SUPERUSER,
		password: SUPERPASS,
		host: 'localhost',
		port: 5432,
		database: DB_NAME,
	});

	await dbClient.connect();

	// 4. Передача прав и владения схемой `public`
	await dbClient.query(`
  ALTER SCHEMA public OWNER TO ${DB_USER};
  GRANT ALL ON SCHEMA public TO ${DB_USER};
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${DB_USER};
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${DB_USER};
`);

	await dbClient.end();

	// 5. Проверка подключения под пользователем приложения
	const appClient = new Client({
		user: DB_USER,
		password: DB_PASSWORD,
		host: 'localhost',
		port: 5432,
		database: DB_NAME,
	});
	try {
		await appClient.connect();

		console.log('✅ Подключение к базе под пользователем прошло успешно');
	} catch (error) {
		console.error(error);
	} finally {
		await appClient.end();
	}
}
