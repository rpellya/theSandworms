import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Topic } from '../models/topic';
import { Message } from '../models/message';
import { User } from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_PORT,
	POSTGRES_HOST,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
	host: POSTGRES_HOST || 'postgres',
	port: Number(POSTGRES_PORT),
	username: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DB,
	dialect: 'postgres',
	models: [Topic, Message, User],
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
	try {
		await sequelize.sync();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
