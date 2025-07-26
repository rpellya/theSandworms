import { Request, Response } from 'express';
import { getYandexClientId, setUserIntoDb } from '../services/auth.service';

/**
 * @swagger
 * /oauth/yandex:
 *   get:
 *     summary: Получить Yandex client_id
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Успешный ответ с clientId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientId:
 *                   type: string
 */
export const handleYandexOAuth = async (_req: Request, res: Response) => {
	const clientId = await getYandexClientId();

	if (!clientId) {
		return res.status(500).json({ error: 'Не удалось получить client_id' });
	}

	return res.json({ clientId });
};

/**
 * @swagger
 * /oauth/setUser:
 *   post:
 *     summary: Сохранить пользователя в базу
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 required:
 *                   - id
 *                   - first_name
 *                   - second_name
 *                 properties:
 *                   id:
 *                     type: integer
 *                   first_name:
 *                     type: string
 *                   second_name:
 *                     type: string
 *     responses:
 *       200:
 *         description: Пользователь сохранён
 */
export const setUser = async (req: Request, res: Response) => {
	const { user } = req.body;
	const response = await setUserIntoDb(user);
	return res.json(response);
};
