// Assuming this is the task model (task.js)
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'], // Make sure these are the valid values
    default: 'To Do',
  },
  // Other fields can go here
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
