export interface IFieldType {
	fieldName: string;
	key: ProfileFieldKey;
	placeholder: string;
	fieldType: string;
}
export interface IProfileValues {
	profileValues: {
		id: number;
		avatar: string;
		first_name: string;
		second_name: string;
		display_name: string;
		login: string;
		email: string;
		phone: string;
	};
}

export type ProfileFieldKey =
	| 'first_name'
	| 'second_name'
	| 'display_name'
	| 'login'
	| 'email'
	| 'phone';
