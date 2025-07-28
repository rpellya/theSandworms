import { Router } from 'express';
import authRouter from './auth.router';
import forumRouter from './forumRouter';

const apiRouter = Router();

apiRouter.use('/api/oauth', authRouter);
apiRouter.use('/api/forum', forumRouter);

export default apiRouter;
