import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
// model
const User = mongoose.model("User", userSchema);

export default User;
