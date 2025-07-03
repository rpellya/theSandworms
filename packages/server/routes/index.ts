import { Router } from 'express';
import authRouter from './auth.router';

const apiRouter = Router();

apiRouter.use('/oauth', authRouter);

export default apiRouter;
