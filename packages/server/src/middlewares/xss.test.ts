import { sanitizeObject } from './xss';

describe('sanitizeObject', () => {
	it('очищает строки с XSS уязвимостями', () => {
		const input = {
			safe: 'Hello',
			script: '<script>alert("XSS")</script>',
			nested: { tag: '<img src=x onerror=alert(2)>' },
			number: 123,
			nullValue: null,
			array: ['<b>bold</b>', 42],
		};

		const result = sanitizeObject(input);

		expect(result.safe).toBe('Hello');
		expect(result.script).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;'); // Этот может остаться, если хранишь в таком виде
		expect(result.nested.tag).toBe('<img src>'); // вот так, потому что xss очищает опасные атрибуты
		expect(result.number).toBe(123);
		expect(result.nullValue).toBeNull();
		expect(result.array[0]).toBe('<b>bold</b>'); // В зависимости от настроек xss, теги <b> могут остаться
		expect(result.array[1]).toBe(42);
	});
});
