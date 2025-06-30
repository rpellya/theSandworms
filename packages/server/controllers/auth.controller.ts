import { Request, Response } from 'express';
import { getYandexClientId } from '../services/auth.service';

export const handleYandexOAuth = async (_req: Request, res: Response) => {
	const clientId = await getYandexClientId();

	if (!clientId) {
		return res.status(500).json({ error: 'Не удалось получить client_id' });
	}

	return res.json({ clientId });
};
