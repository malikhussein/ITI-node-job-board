import { model, Schema } from 'mongoose';

const jobSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    salary_range: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
    },
    location: {
      type: String,
    },
    // Company Rel
  },
  { timestamps: true }
);

const jobModel = model('Job', jobSchema);

export default jobModel;
