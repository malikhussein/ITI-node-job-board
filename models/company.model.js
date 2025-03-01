import { model, Schema } from 'mongoose';

const companySchema = new Schema(
  {
    name: {
      type: String,
    },
    industry: {
      type: String,
    },
    website: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }

  },
  { timestamps: true }
);

const companyModel = model('Company', companySchema);

export default companyModel;
