export type TForumTopic = {
	id: string;
	title: string;
	dateTime: Date;
	lastMessage: TForumMessage;
	author: TForumAuthor;
};

export type TForumMessage = {
	id: string;
	message: string;
	author: TForumAuthor;
	dateTime: Date;
	topicId: string;
};

export type TForumAuthor = {
	id: string;
	name: string;
	avatarUrl?: string;
};
