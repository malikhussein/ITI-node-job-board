import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'job-seeker', 'employer'],
      default: 'job-seeker',
    },
  },
  { timestamps: true }
);

const userModel = model('User', userSchema);

export default userModel;
