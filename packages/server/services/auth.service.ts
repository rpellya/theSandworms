import fetch from 'node-fetch';

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
