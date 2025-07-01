import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'app/providers/const/localStorage';
import { UserInfo } from 'store/types';

interface InitialState {
	userInfo: UserInfo | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}
const initialState: InitialState = {
	userInfo: null,
	isAuthenticated: false,
	isLoading: false,
};

export const fetchUserThunk = createAsyncThunk(
	'user/fetchUserThunk',
	async () => {
		const url = 'http://localhost:3001/user';
		return fetch(url).then((res) => res.json());
	},
);

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
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserThunk.pending.type, (state) => {
				state.userInfo = null;
				state.isLoading = true;
			})
			.addCase(
				fetchUserThunk.fulfilled.type,
				(state, { payload }: PayloadAction<UserInfo>) => {
					state.userInfo = payload;
					state.isLoading = false;
				},
			)
			.addCase(fetchUserThunk.rejected.type, (state) => {
				state.isLoading = false;
			});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
