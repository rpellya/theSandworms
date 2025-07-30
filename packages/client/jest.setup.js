/* global jest */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('nanoid', () => {
	return {
		nanoid: () => Math.random().toString(),
	};
});
