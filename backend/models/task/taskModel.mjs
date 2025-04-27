import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    discription: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;