import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'consts/baseUrl';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: 'include' }),
	endpoints: (builder) => ({
		registerApi: builder.mutation({
			query: (body) => ({
				url: '/auth/signup',
				method: 'POST',
				body,
			}),
		}),
		loginApi: builder.mutation({
			query: (body) => ({
				url: '/auth/signin',
				method: 'POST',
				body,
				responseHandler: 'text',
				credentials: 'include',
			}),
		}),
		logoutApi: builder.mutation<string, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
				credentials: 'include',
				responseHandler: 'text',
			}),
		}),
		getAuthUser: builder.query<any, void>({
			query: () => ({
				url: '/auth/user',
				method: 'GET',
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useLazyGetAuthUserQuery,
	useGetAuthUserQuery,
	useRegisterApiMutation,
	useLoginApiMutation,
	useLogoutApiMutation,
} = authApi;
