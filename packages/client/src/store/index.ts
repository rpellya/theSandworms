import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from 'store/rootReduser';
import { authApi } from 'api/auth/authApi';
import { rtkApi } from 'api/gameApi/rtk';
import { leaderBoardApi } from 'api/leaderBoard/leaderBoardApi';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			rtkApi.middleware,
			leaderBoardApi.middleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
