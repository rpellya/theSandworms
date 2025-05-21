import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from 'api/types';

interface IInitialState {
	userInfo: IUserInfo | null;
}
const initialState: IInitialState = {
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
