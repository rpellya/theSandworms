import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'The Sandworms API',
			version: '1.0.0',
		},
		components: {
			schemas: {
				Topic: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						title: { type: 'string' },
						description: { type: 'string' },
						userId: { type: 'integer' },
						created_at: { type: 'string', format: 'date-time' },
						updated_at: { type: 'string', format: 'date-time' },
					},
				},
				Message: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						topicId: { type: 'string' },
						userId: { type: 'integer' },
						content: { type: 'string' },
						created_at: { type: 'string', format: 'date-time' },
						updated_at: { type: 'string', format: 'date-time' },
					},
				},
				Emoji: {
					type: 'object',
					properties: {
						id: { type: 'integer' },
						userId: { type: 'integer' },
						emoji: { type: 'string' },
						messageId: { type: 'string', format: 'uuid' },
						createdAt: { type: 'string', format: 'date-time' },
						updatedAt: { type: 'string', format: 'date-time' },
					},
					required: [
						'id',
						'userId',
						'emoji',
						'messageId',
						'createdAt',
						'updatedAt',
					],
				},
			},
		},
	},
	apis: ['./src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
