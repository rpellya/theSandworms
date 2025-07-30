import { Router } from 'express';
import { handleYandexOAuth, setUser } from '../controllers/auth.controller';

const apiRouter = Router();

apiRouter.post('/yandex', handleYandexOAuth);
apiRouter.post('/setUser', setUser);

export default apiRouter;
