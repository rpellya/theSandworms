import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from 'api/auth/authApi';
import { rtkApi } from 'api/gameApi/rtk';
import { leaderBoardApi } from 'api/leaderBoard/leaderBoardApi';
import { forumApi } from 'api/forumApi/forumApi';
import { userReducer } from './userInfoSlice';
import { oAuthApi } from 'api/auth/oAuthApi';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[oAuthApi.reducerPath]: oAuthApi.reducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
	[leaderBoardApi.reducerPath]: leaderBoardApi.reducer,
	[forumApi.reducerPath]: forumApi.reducer,
	userReducer,
});
