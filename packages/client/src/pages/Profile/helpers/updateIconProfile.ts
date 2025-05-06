import { Dispatch } from '@reduxjs/toolkit';
import { changeIcon } from 'store/profile/profileSlice';

export const updateIconProfile = (dispatch: Dispatch) => {
	const input = document.createElement('input');
	input.setAttribute('type', 'file');
	input.accept = 'image';
	input.onchange = () => {
		if (input.files && input.files[0]) {
			const file = input.files[0];
			const icon = URL.createObjectURL(file);
			dispatch(changeIcon(icon));
		}
	};
	input.click();
};
