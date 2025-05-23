export const updateIconProfile = (
	setIcon: (value: string) => void,
	handleUpload: (value: File) => void,
) => {
	const input = document.createElement('input');
	input.setAttribute('type', 'file');
	input.accept = 'image';
	input.onchange = () => {
		if (input.files && input.files[0]) {
			const file = input.files[0];
			handleUpload(file);
			const icon = URL.createObjectURL(file);
			setIcon(icon);
		}
	};
	input.click();
};
