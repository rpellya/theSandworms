import { User } from '../models/user';
import { Message } from '../models/message';
import { Topic } from '../models/topic';
import { logger } from '../logger';
import { Emoji } from '../models/emoji';

interface CreateMessageParams {
	topicId: string;
	message: string;
	userId: string;
}

interface CreateEmojiParams {
	userId: number;
	emoji: string;
	messageId: string;
}

export const createMessageForTopic = async ({
	topicId,
	message,
	userId,
}: CreateMessageParams) => {
	return await Message.create({ topicId, message, userId });
};

export const getListTopicsFromDB = async () => {
	try {
		const topics = await Topic.findAll({
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName'],
				},
				{
					model: Message,
					include: [
						{
							model: User,
							attributes: ['firstName', 'lastName', 'avatar'],
						},
					],
				},
			],
		});
		return topics;
	} catch (error) {
		logger.error('❌ Ошибка при получении топиков:', error);
		throw error;
	}
};

export const getTopicById = async (id: string) => {
	try {
		const topic = await Topic.findOne({
			where: { id },
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName', 'avatar'],
				},
				{
					model: Message,
					include: [
						{
							model: User,
							attributes: ['firstName', 'lastName', 'avatar'],
						},
					],
				},
			],
		});
		return topic;
	} catch (error) {
		logger.error('❌ Ошибка при получении топика по ID:', error);
		throw error;
	}
};

export const createTopicDB = async (params: Record<any, string>) => {
	try {
		const topic = await Topic.create(params);
		return topic;
	} catch (err) {
		logger.error('Ошибка при создании топика:', err);
		throw err;
	}
};

export const getAllEmojis = async () => {
	return await Emoji.findAll();
};

export const toggleEmojiDB = async ({
	userId,
	emoji,
	messageId,
}: CreateEmojiParams) => {
	const existingEmoji = await Emoji.findOne({
		where: { userId, emoji, messageId },
	});

	if (existingEmoji) {
		await existingEmoji.destroy();
		return { removed: true };
	} else {
		const newEmoji = await Emoji.create({ userId, emoji, messageId });
		return { removed: false, data: newEmoji };
	}
};
