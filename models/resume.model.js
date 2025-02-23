import { model, Schema } from 'mongoose';

const resumeSchema = new Schema(
  {
    // User Rel
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const resumeModel = model('Resume', resumeSchema);

export default resumeModel;
