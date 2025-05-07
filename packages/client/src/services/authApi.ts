import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'consts/baseUrl';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		registerApi: builder.mutation({
			query: (body) => ({
				url: '/auth/signup',
				method: 'POST',
				body,
				responseHandler: 'text',
			}),
		}),
		loginApi: builder.mutation({
			query: (body) => ({
				url: '/auth/signin',
				method: 'POST',
				body,
				credentials: 'include',
				responseHandler: 'text',
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
				responseHandler: 'text',
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
