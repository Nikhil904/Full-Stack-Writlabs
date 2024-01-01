import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address:{
    type:String,
    required: true,
  },
  dob:{
    type:String,
    required: true,
  },
  education:{
    type:Object,
    required:false
  },
  experience:{
    type:Object,
    required:false
  }
});

const User = mongoose.model("User", userSchema);

export default User;
