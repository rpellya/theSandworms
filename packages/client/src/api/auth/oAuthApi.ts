import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, apiUrl } from 'consts/baseUrl';

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
				url: `${apiUrl}/oauth/yandex`,
				method: 'POST',
				credentials: 'include',
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
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body,
				responseHandler: 'text',
			}),
		}),
		setUser: builder.query<any, string>({
			query: (user) => ({
				url: `${apiUrl}/oauth/setUser`,
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: { user: JSON.parse(user) },
			}),
		}),
	}),
});

export const {
	useGetYandexServiceIdQuery,
	useLazyGetYandexServiceIdQuery,
	useSendYandexCodeMutation,
	useLazySetUserQuery,
} = oAuthApi;
