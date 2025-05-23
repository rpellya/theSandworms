import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'consts/baseUrl';

export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		puthUser: builder.mutation<string, any>({
			query: (body) => ({
				url: '/user/profile',
				method: 'PUT',
				body,
				credentials: 'include',
			}),
		}),
		updateAvatarProfile: builder.mutation({
			query: (formData) => ({
				url: '/user/profile/avatar',
				body: formData,
				method: 'PUT',
				credentials: 'include',
			}),
		}),
	}),
});

export const { usePuthUserMutation, useUpdateAvatarProfileMutation } = rtkApi;
