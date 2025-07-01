import { User } from '../models/user';
import { Message } from '../models/message';
import { Topic } from '../models/topic';

interface CreateMessageParams {
	topicId: string;
	message: string;
	userId: string;
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
							attributes: ['firstName', 'lastName'],
						},
					],
				},
			],
		});
		return topics;
	} catch (error) {
		console.error('❌ Ошибка при получении топиков:', error);
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
					attributes: ['firstName', 'lastName'],
				},
				{
					model: Message,
					include: [
						{
							model: User,
							attributes: ['firstName', 'lastName'],
						},
					],
				},
			],
		});
		return topic;
	} catch (error) {
		console.error('❌ Ошибка при получении топика по ID:', error);
		throw error;
	}
};

export const createTopicDB = async (params: Record<any, string>) => {
	try {
		const topic = await Topic.create(params);
		return topic;
	} catch (err) {
		console.error('Ошибка при создании топика:', err);
		throw err;
	}
};
