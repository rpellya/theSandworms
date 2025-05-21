import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'api/auth/authApi';
import userReducer from 'store/userInfoSlice';
import { rtkApi } from 'api/gameApi/rtk';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
	userReducer,
});
