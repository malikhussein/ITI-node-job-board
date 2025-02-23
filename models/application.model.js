import { model, Schema } from 'mongoose';

const applicationSchema = new Schema(
  {
    // User Rel
    // Job Rel
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const applicationModel = model('Application', applicationSchema);

export default applicationModel;
