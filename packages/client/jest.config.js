import dotenv from 'dotenv';
dotenv.config();

export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
	testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
	moduleFileExtensions: ['ts', 'tsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass|png|svg|jpg)$': 'identity-obj-proxy',
	},
	moduleDirectories: ['node_modules', 'src'],
	globals: {
		__SERVER_PORT__: process.env.SERVER_PORT,
	},
};
