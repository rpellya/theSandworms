import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from 'store/types';

interface InitialState {
	userInfo: UserInfo | null;
}
const initialState: InitialState = {
	userInfo: null,
};

export const userInfo = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		setUserInfo(state, action) {
			state.userInfo = action.payload;
		},
	},
});
export const { setUserInfo } = userInfo.actions;
export default userInfo.reducer;
