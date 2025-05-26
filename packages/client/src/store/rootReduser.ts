import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'api/auth/authApi';
import { rtkApi } from 'api/gameApi/rtk';
import { userReducer } from './userInfoSlice';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
	userReducer,
});
