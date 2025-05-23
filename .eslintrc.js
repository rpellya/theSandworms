module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 11,
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/ban-ts-comment': 1,

		// Пробелы в конце строк: игнорируем для пустых строк, разрешаем для многострочных комментариев
		'no-trailing-spaces': [
			'warn',
			{
				skipBlankLines: false,
				ignoreComments: true,
			},
		],

		// Кавычки вокруг идентификаторов: требует либо все в кавычках, либо все без
		'quote-props': ['warn', 'as-needed'],

		// Требуем одинарные кавычки
		quotes: ['warn', 'single'],

		// Длина строки: не более 125 символов, кроме комментариев
		'max-len': ['error', { ignoreComments: true, code: 125 }],
	},
};
