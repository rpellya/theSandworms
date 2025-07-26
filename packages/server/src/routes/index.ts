import { Router } from 'express';
import authRouter from './auth.router';
import forumRouter from './forumRouter';

const apiRouter = Router();

apiRouter.use('/oauth', authRouter);
apiRouter.use('/forum', forumRouter);

export default apiRouter;
