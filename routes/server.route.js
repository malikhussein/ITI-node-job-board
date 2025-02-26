import { Router } from 'express';
import applicationRouter from './application.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import jobRouter from './job.route.js';


const mainRouter = Router();

mainRouter.use('/application', applicationRouter);
mainRouter.use('/auth', authRoutes);
mainRouter.use('/user',userRoutes)
mainRouter.use('/job', jobRouter)


export default mainRouter;
