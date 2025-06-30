import { Router } from 'express';
import { handleYandexOAuth } from '../controllers/auth.controller';

const apiRouter = Router();

apiRouter.post('/yandex', handleYandexOAuth);

export default apiRouter;
