import {
	addMessageToTopic,
	createTopic,
	getTopicByUUID,
	getTopics,
	getEmojies,
	toggleEmoji,
} from '../controllers/forum.controller';
import { Router } from 'express';

const forumRouter = Router();

forumRouter.get('/topics', getTopics);
forumRouter.get('/topic/emojies', getEmojies);
forumRouter.get('/topic/:topicId', getTopicByUUID);
forumRouter.post('/createTopic', createTopic);
forumRouter.post('/topics/:topicId/messages', addMessageToTopic);
forumRouter.post('/topic/emojies', toggleEmoji);

export default forumRouter;
