import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from 'store/rootReduser';
import { authApi } from 'api/auth/authApi';
import { rtkApi } from 'api/gameApi/rtk';
import { leaderBoardApi } from 'api/leaderBoard/leaderBoardApi';
import { oAuthApi } from 'api/auth/oAuthApi';
import { forumApi } from 'api/forumApi/forumApi';

// Глобально декларируем в window наш ключ и задаем ему тип такой же, как у стейта в сторе
declare global {
	interface Window {
		APP_INITIAL_STATE: ReturnType<typeof rootReducer>;
	}
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			oAuthApi.middleware,
			rtkApi.middleware,
			leaderBoardApi.middleware,
			forumApi.middleware,
		),
	preloadedState:
		typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
