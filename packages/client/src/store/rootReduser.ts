import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'api/auth/authApi';
import { rtkApi } from 'api/gameApi/rtk';
import { leaderBoardApi } from 'api/leaderBoard/leaderBoardApi';
import { userReducer } from './userInfoSlice';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
	[leaderBoardApi.reducerPath]: leaderBoardApi.reducer,
	userReducer,
});
