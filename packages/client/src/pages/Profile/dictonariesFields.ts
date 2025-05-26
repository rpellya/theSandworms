import { FieldType } from './types';

export const dictonariesFields: FieldType[] = [
	{
		fieldName: 'Фамилия',
		key: 'second_name',
		fieldType: 'text',
		regExp: /^[А-ЯЁA-Z][а-яёa-z-]*$/,
		message:
			'Фамилия должна начинаться с заглавной буквы и содержать только буквы или дефис',
	},
	{
		fieldName: 'Имя',
		key: 'first_name',
		fieldType: 'text',
		regExp: /^[А-ЯЁA-Z][а-яёa-z-]*$/,
		message:
			'Имя должно начинаться с заглавной буквы и содержать только буквы или дефис',
	},
	{
		fieldName: 'Логин',
		key: 'login',
		fieldType: 'text',
		regExp: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
		message: `От 3 до 20 символов Латиница, 
                  цифры Без пробелов и спецсимволов, кроме - и _ 
                  Не должен состоять только из цифр`,
	},
	{
		fieldName: 'Телефон',
		key: 'phone',
		fieldType: 'text',
		regExp: /^\+?\d{10,15}$/,
		message:
			'Телефон может содержать только цифры и должен быть от 10 до 15 символов',
	},
	{
		fieldName: 'Email',
		key: 'email',
		fieldType: 'text',
		regExp: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
		message: `Латиница 
                  Может включать цифры, -, _ 
                  Обязательно: @, далее буквы, точка, затем домен`,
	},
	{
		fieldName: 'Никнейм',
		key: 'display_name',
		fieldType: 'text',
		regExp: /^.{0,25}$/,
		message: 'Не больше 25 символов',
	},
];
