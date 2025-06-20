import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'consts/baseUrl';

interface ServiceIdResponse {
	clientId: string;
}

interface SendCodeRequest {
	code: string;
	redirect_uri: string;
}

export const oAuthApi = createApi({
	reducerPath: 'oAuthApi',
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: 'include',
	}),
	endpoints: (builder) => ({
		getYandexServiceId: builder.query<
			ServiceIdResponse,
			{ redirectUri: string }
		>({
			query: ({ redirectUri }) => ({
				url: 'http://localhost:3001/oauth/yandex',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: { redirectUri },
			}),
		}),

		sendYandexCode: builder.mutation<any, SendCodeRequest>({
			query: (body) => ({
				url: 'https://ya-praktikum.tech/api/v2/oauth/yandex',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body,
				responseHandler: 'text',
			}),
		}),
	}),
});

export const {
	useGetYandexServiceIdQuery,
	useLazyGetYandexServiceIdQuery,
	useSendYandexCodeMutation,
} = oAuthApi;
