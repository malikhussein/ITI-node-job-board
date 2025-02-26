import { Router } from 'express';
import Application from '../controllers/application.controller.js';

const applicationRouter = Router();

applicationRouter.post('/:jobId', Application.applyJob);
applicationRouter.get('/', Application.getUserApplications);

export default applicationRouter;
