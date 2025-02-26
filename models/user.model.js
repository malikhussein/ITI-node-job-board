import { model, Schema } from 'mongoose';
const roleType = {
  job_seeker: 'job_seeker',
  employer: 'employer',
  Admin: 'Admin',
};

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'userName field is required'],
      minlength: 2,
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,

    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  
    //TODO
    image :{
      type : String,
      default: "https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg" ,
      required: false,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],

    },
    role: {
      type: String,
      enum: Object.values(roleType), // Retrieve all values from the roleType object
      default: roleType.job_seeker,
    },
  },
  { timestamps: true }
);

const userModel = model('User', userSchema);

export default userModel;
