import { Router } from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.post("/create", createJob);
jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJobById);
jobRouter.put("/update/:id", updateJob);
jobRouter.delete("/delete/:id", deleteJob);

export default jobRouter;
