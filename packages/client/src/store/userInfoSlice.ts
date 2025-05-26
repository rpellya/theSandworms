import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'app/providers/const/localStorage';
import { UserInfo } from 'store/types';

interface InitialState {
	userInfo: UserInfo | null;
	isAuthenticated: boolean;
}
const initialState: InitialState = {
	userInfo: null,
	isAuthenticated: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfo(state, action: PayloadAction<UserInfo>) {
			state.userInfo = action.payload;
		},
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
			if (user) {
				state.userInfo = JSON.parse(user);
				state.isAuthenticated = true;
			}
		},
		logout: (state) => {
			console.log(state, 'logout');

			state.userInfo = null;
			// state.isAuthenticated = false;
			localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		},
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
