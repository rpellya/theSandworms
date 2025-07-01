import {
	addMessageToTopic,
	createTopic,
	getTopicByUUID,
	getTopics,
} from '../controllers/forum.controller';
import { Router } from 'express';

const forumRouter = Router();

forumRouter.get('/topics', getTopics);
forumRouter.get('/topic/:topicId', getTopicByUUID);
forumRouter.post('/createTopic', createTopic);
forumRouter.post('/topics/:topicId/messages', addMessageToTopic);

export default forumRouter;
