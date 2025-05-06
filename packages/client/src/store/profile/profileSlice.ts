import { createSlice } from '@reduxjs/toolkit';
import { dictonariesFields } from 'pages/Profile/dictonariesFields';

const initialState = {
	icon: '/avatar.svg',
	profileState: dictonariesFields,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		changeInput(state, action) {
			// eslint-disable-next-line max-len
			state.profileState.map((item) => {
				item.key === action.payload.key
					? { ...item, value: action.payload.value }
					: { item };
			});
		},
		changeIcon(state, action) {
			state.icon = action.payload;
		},
	},
});

export const { changeInput, changeIcon } = profileSlice.actions;
export default profileSlice.reducer;
