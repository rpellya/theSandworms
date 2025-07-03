import fetch from 'node-fetch';
import { User } from '../models/user';
import { logger } from '../logger';

const base_host = 'https://ya-praktikum.tech/api/v2/oauth/yandex';

export const getYandexClientId = async (): Promise<string | null> => {
	try {
		const resp = await fetch(`${base_host}/service-id`);
		const data = await resp.json();
		return data.service_id || null;
	} catch (error) {
		console.error('[getYandexClientId error]:', error);
		return null;
	}
};

export const setUserIntoDb = async (user: Record<string, any>) => {
	try {
		await User.upsert({
			id: user.id,
			firstName: user.first_name,
			lastName: user.second_name,
			avatar: user.avatar,
			display_name: user.display_name,
		});
		logger.info(`👤 Пользователь ${user.id} сохранён`);
		return `👤 Пользователь ${user.id} сохранён`;
	} catch (error) {
		logger.error('Ошибка при сохранении пользователя в БД:', error);
		return error;
	}
};
