import { TForumAuthor, TForumMessage, TForumTopic } from './types';

const mockAuthor: TForumAuthor = {
	id: 'u1',
	name: 'Alice Johnson',
	avatarUrl: 'https://example.com/avatars/u1.png',
};

const mockMessage: TForumMessage = {
	id: 'm1',
	message: 'Это последнее сообщение в теме!',
	author: mockAuthor,
	dateTime: new Date('2024-05-05T10:15:00'),
	topicId: 't1',
};

const mockTopic: TForumTopic = {
	id: 't1',
	title: 'Как подключить Redux?',
	dateTime: new Date('2024-05-04T08:00:00'),
	lastMessage: mockMessage,
	author: mockAuthor,
};

const forumTopicsMock: TForumTopic[] = Array.from({ length: 10 }, (_, i) => {
	const topicId = `t${i + 1}`;
	const messageId = `m${i + 1}`;

	const mockMessage: TForumMessage = {
		id: messageId,
		message: `Это последнее сообщение в теме #${i + 1}`,
		author: mockAuthor,
		dateTime: new Date(2024, 4, 5, 10, i * 5), // Разное время
		topicId,
	};

	return {
		id: topicId,
		title: `Тема форума №${i + 1}`,
		dateTime: new Date(2024, 4, 4, 8, i * 10),
		lastMessage: mockMessage,
		author: mockAuthor,
	};
});

const forumMessagesMock: TForumMessage[] = forumTopicsMock.flatMap(
	(topic, topicIndex) =>
		Array.from({ length: 3 }, (_, msgIndex) => {
			const messageId = `t${topicIndex + 1}_m${msgIndex + 1}`;
			return {
				id: messageId,
				message: `Сообщение ${msgIndex + 1} в теме "${topic.title}"`,
				author: mockAuthor,
				dateTime: new Date(2024, 4, 4, 9 + msgIndex, topicIndex * 3),
				topicId: topic.id,
			};
		}),
);

export { forumTopicsMock, forumMessagesMock };
