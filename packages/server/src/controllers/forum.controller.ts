import { Request, Response } from 'express';
import {
	createMessageForTopic,
	createTopicDB,
	getAllEmojis,
	getListTopicsFromDB,
	getTopicById,
	toggleEmojiDB,
} from '../services/forum.service';
import { logger } from '../logger';

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
		logger.error('Ошибка при создании топика:', error);
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
		logger.error('Ошибка при создании сообщения:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * @swagger
 * /forum/emojies:
 *   get:
 *     summary: Получить список Эмоджи
 *     tags: [Forum]
 *     responses:
 *       200:
 *         description: Список Эмоджи
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
export const getEmojies = async (_req: Request, res: Response) => {
	const emojies = await getAllEmojis();
	if (!emojies) {
		return res.status(500).json({ error: 'Не удалось получить топики' });
	}
	return res.json(emojies);
};

/**
 * @swagger
 * /forum/emojis:
 *   post:
 *     summary: Создать новый emoji для пользователя
 *     tags: [Forum]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - emoji
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 123
 *               emoji:
 *                 type: string
 *                 example: "😊"
 *     responses:
 *       201:
 *         description: Emoji успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 123
 *                     emoji:
 *                       type: string
 *                       example: "😊"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-10T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-10T12:34:56.789Z"
 *       400:
 *         description: Отсутствуют обязательные параметры userId или emoji
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "userId и emoji обязательны"
 *       500:
 *         description: Внутренняя ошибка сервера при создании emoji
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
export const toggleEmoji = async (req: Request, res: Response) => {
	const { userId, emoji, messageId } = req.body;

	if (!userId || !emoji || !messageId) {
		return res
			.status(400)
			.json({ error: 'userId, emoji и messageId обязательны' });
	}

	try {
		const result = await toggleEmojiDB({ userId, emoji, messageId });

		if (result.removed) {
			return res.status(200).json({ message: 'Emoji удалено' });
		} else {
			return res.status(201).json({ data: result.data });
		}
	} catch (error) {
		logger.error('Ошибка при переключении emoji:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
