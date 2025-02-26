import { Router } from 'express';
import Application from '../controllers/application.controller.js';

const applicationRouter = Router();

applicationRouter.post('/:jobId', Application.applyJob);
applicationRouter.get('/', Application.getUserApplications);
applicationRouter.get('/:jobId', Application.getJobApplications);
// ? /:id/status or /status/:id
applicationRouter.put('/:id/status', Application.updateStatus);

export default applicationRouter;
