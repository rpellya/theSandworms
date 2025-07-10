import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from 'consts/baseUrl';

export interface Topic {
	id?: string;
	title: string;
	description: string;
	userId: number;
	createdAt?: string;
	updatedAt?: string;
	user?: {
		firstName: string;
		lastName: string;
		avatar?: string;
	};
	messages?: Array<Message>;
}

export interface Message {
	id?: string;
	topicId: string;
	userId: number;
	message: string;
	createdAt?: string;
	updatedAt?: string;
	user?: {
		firstName: string;
		lastName: string;
		avatar?: string;
	};
}

export interface Emoji {
	userId: number;
	emoji: string;
}

export const forumApi = createApi({
	reducerPath: 'forum',
	baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
	endpoints: (builder) => ({
		getTopics: builder.mutation({
			query: () => ({
				url: '/forum/topics',
				method: 'GET',
				credentials: 'include',
			}),
		}),

		getTopic: builder.mutation({
			query: (topicId) => ({
				url: `/forum/topic/${topicId}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),

		createTopic: builder.mutation({
			query: (body) => ({
				url: '/forum/createTopic',
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),

		createMessage: builder.mutation({
			query: (body: Message) => ({
				url: `/forum/topics/${body.topicId}/messages`,
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),

		createEmoji: builder.mutation({
			query: (body: Emoji) => ({
				url: '/forum/topic/createEmoji',
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useGetTopicsMutation,
	useGetTopicMutation,
	useCreateTopicMutation,
	useCreateMessageMutation,
	useCreateEmojiMutation,
} = forumApi;
