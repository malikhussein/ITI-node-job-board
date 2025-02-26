import Job from '../models/job.model.js';

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, description, salaryRange, location } = req.body;

    //required
    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide at least title and description' });
    }

    // Validate salaryRange
    if (salaryRange) {
      if (typeof salaryRange.min !== 'number' || typeof salaryRange.max !== 'number') {
        return res.status(400).json({ message: 'Salary range values must be numbers' });
      }
      if (salaryRange.min < 0 || salaryRange.max < 0) {
        return res.status(400).json({ message: 'Salary range values cannot be negative' });
      }
      if (salaryRange.min > salaryRange.max) {
        return res.status(400).json({ message: 'Minimum salary must be less than maximum salary' });
      }
    }

    const newJob = new Job({
      title,
      description,
      salaryRange:salaryRange || { min: 0, max: 0 },
      location,
      //employer middleware for authentication
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Sorry! Job is not created', error: error.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'There are no Jobs at this time', error: error.message });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'There is no job with this id', error: error.message });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const { title, description, salaryRange, location } = req.body;

    // Update job feilds
    const updatedData = {};
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (location) updatedData.location = location;
    if (salaryRange) {
      if (typeof salaryRange.min !== 'number' || typeof salaryRange.max !== 'number') {
        return res.status(400).json({ message: 'Salary range values must be numbers' });
      }
      if (salaryRange.min < 0 || salaryRange.max < 0) {
        return res.status(400).json({ message: 'Salary range values cannot be negative' });
      }
      if (salaryRange.min > salaryRange.max) {
        return res.status(400).json({ message: 'Minimum salary must be less than maximum salary' });
      }
      updatedData.salaryRange = salaryRange;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, 
      runValidators: true
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the job', error: error.message });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Job is not exist!', error: error.message });
  }
};