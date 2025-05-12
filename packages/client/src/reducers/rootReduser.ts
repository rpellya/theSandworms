import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'services/authApi';
import { profileApi } from 'services/profileApi';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[profileApi.reducerPath]: profileApi.reducer,
	// другие редьюсеры
});
