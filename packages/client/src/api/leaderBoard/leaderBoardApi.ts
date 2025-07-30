import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'consts/baseUrl';

export const RATING_FIELD_NAME = 'sandWormHighScore1';

export interface LeaderBoardDataRow {
	data: {
		login?: string;
		[RATING_FIELD_NAME]: number;
	};
}

export interface LeaderBoardData {
	data: Array<LeaderBoardDataRow>;
}

export const leaderBoardApi = createApi({
	reducerPath: 'leaderBoard',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		sendScore: builder.mutation({
			query: (body) => ({
				url: '/leaderboard',
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),

		getLeaders: builder.mutation({
			query: (body) => ({
				url: '/leaderboard/all',
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useSendScoreMutation, useGetLeadersMutation } = leaderBoardApi;
