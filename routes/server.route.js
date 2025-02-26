import { Router } from 'express';
import applicationRouter from './application.route.js';

const mainRouter = Router();

mainRouter.use('/application', applicationRouter);

export default mainRouter;
