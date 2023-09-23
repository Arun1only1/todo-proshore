import mongoose from "mongoose";

// schema
const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 20,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      minlength: 3,
      maxlength: 100,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
