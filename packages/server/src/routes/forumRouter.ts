import {
	addMessageToTopic,
	createTopic,
	getTopicByUUID,
	getTopics,
	createEmoji,
} from '../controllers/forum.controller';
import { Router } from 'express';

const forumRouter = Router();

forumRouter.get('/topics', getTopics);
forumRouter.get('/topic/:topicId', getTopicByUUID);
forumRouter.post('/createTopic', createTopic);
forumRouter.post('/topics/:topicId/messages', addMessageToTopic);
forumRouter.post('/topic/createEmoji', createEmoji);

export default forumRouter;
