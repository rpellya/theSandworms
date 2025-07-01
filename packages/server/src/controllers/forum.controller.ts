import { Request, Response } from 'express';
import {
	createMessageForTopic,
	createTopicDB,
	getListTopicsFromDB,
	getTopicById,
} from '../services/forum.service';

/**
 * @swagger
 * /forum/topics:
 *   get:
 *     summary: Получить список топиков
 *     tags: [Forum]
 *     responses:
 *       200:
 *         description: Список топиков
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Topic'
 */
export const getTopics = async (_req: Request, res: Response) => {
	const topics = await getListTopicsFromDB();
	if (!topics) {
		return res.status(500).json({ error: 'Не удалось получить топики' });
	}
	return res.json({ topics });
};

/**
 * @swagger
 * /forum/topic/{topicId}:
 *   get:
 *     summary: Получить топик по UUID
 *     description: Возвращает топик с указанным UUID, включая связанные сообщения.
 *     tags:
 *       - Forum
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID топика для поиска
 *     responses:
 *       200:
 *         description: Топик успешно найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topic:
 *                   type: object
 *                   description: Топик с сообщениями
 *                   example:
 *                     id: "3c8ac32c-c829-4fbe-bafc-30d2cd617d30"
 *                     title: "Пример топика"
 *                     userId: "4246"
 *                     created_at: "2025-07-01T13:58:25.639Z"
 *                     updated_at: "2025-07-01T13:58:25.639Z"
 *                     messages: []
 *       500:
 *         description: Ошибка при получении топика
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Не удалось получить топик
 */
export const getTopicByUUID = async (_req: Request, res: Response) => {
	const { topicId } = _req.params;
	const topic = await getTopicById(topicId as string);
	if (!topic) {
		return res.status(500).json({ error: 'Не удалось получить топик' });
	}
	return res.json({ topic });
};

/**
 * @swagger
 * /forum/createTopic:
 *   post:
 *     summary: Создать новый топик
 *     tags: [Forum]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Топик создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 */
export const createTopic = async (req: Request, res: Response) => {
	const { title, description, userId } = req.body;

	if (!title || !userId) {
		return res.status(400).json({ error: 'Title и userId обязательны' });
	}

	try {
		const topic = await createTopicDB({ title, description, userId });
		return res.status(201).json({ data: topic });
	} catch (error) {
		console.error('Ошибка при создании топика:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * @swagger
 * /forum/topics/{topicId}/messages:
 *   post:
 *     summary: Добавить сообщение к топику
 *     tags: [Forum]
 *     parameters:
 *       - name: topicId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - userId
 *             properties:
 *               message:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Сообщение добавлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
export const addMessageToTopic = async (req: Request, res: Response) => {
	const { topicId } = req.params;
	const { message, userId } = req.body;

	if (!message || !userId) {
		return res.status(400).json({ error: 'Content и userId обязательны' });
	}

	try {
		const resMessage = await createMessageForTopic({
			topicId,
			message,
			userId,
		});
		return res.status(201).json({ data: resMessage });
	} catch (error) {
		console.error('Ошибка при создании сообщения:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
