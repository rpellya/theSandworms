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
	id?: number;
	userId: number;
	emoji: string;
	messageId: string;
}

export const forumApi = createApi({
	reducerPath: 'forum',
	baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
	tagTypes: ['Topic', 'Message', 'Emoji'],
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

		getEmojies: builder.query<Emoji[], null>({
			query: () => ({
				url: '/forum/topic/emojies',
				method: 'GET',
				credentials: 'include',
			}),
			providesTags: ['Emoji'],
		}),

		toggleEmoji: builder.mutation({
			query: (body: Emoji) => ({
				url: '/forum/topic/emojies',
				method: 'POST',
				body,
				credentials: 'include',
			}),
			invalidatesTags: ['Emoji'],
		}),
	}),
});

export const {
	useGetTopicsMutation,
	useGetTopicMutation,
	useCreateTopicMutation,
	useCreateMessageMutation,
	useGetEmojiesQuery,
	useToggleEmojiMutation,
} = forumApi;
