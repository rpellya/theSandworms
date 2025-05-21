import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'store/services/auth/authApi';
import userReducer from 'store/services/auth/userInfoSlice';
import { rtkApi } from 'store/services/gameApi/rtk';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
	userReducer,
});
