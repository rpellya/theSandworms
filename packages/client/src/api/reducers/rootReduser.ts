import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'api/services/auth/authApi';
import { rtkApi } from 'api/services/gameApi/rtk';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
});
