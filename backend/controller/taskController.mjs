import Task from '../models/task/taskModel.mjs';
import mongoose from 'mongoose';
import User from '../models/user/index.mjs';

// Backend (Controller: createTask function)
const validStatuses = ['To Do', 'In Progress', 'Done']; // Valid status options

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    // Check if assignedTo is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ message: 'Invalid assignedTo ID' });
    }

    // Check if the user exists
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate the status
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid task status. Valid statuses are: To Do, In Progress, Done' });
    }

    // Create a new task
    const task = new Task({ title, description, assignedTo, status });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task', error });
  }
};


// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};
// Update task status (particularly for toggling between 'In Progress' and 'Completed')
const updateTaskStatus = async (req, res) => {
    try {
      const { status } = req.body;
  
      // Validate status
      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid task status' });
      }
  
      // Fetch the task and update status
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      // Update only the status of the task
      task.status = status || task.status;  // Only change status, keep others intact
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  };
  
  // Delete task
  const deleteTask = async (req, res) => {
      try {
          const task = await Task.findByIdAndDelete(req.params.id);
          if (!task) return res.status(404).json({ message: 'Task not found' });
          res.status(200).json({ message: 'Task deleted successfully' });
      } catch (error) {
          res.status(500).json({ message: 'Error deleting task', error });
      }
  };
  
  export { createTask, getTasks, updateTaskStatus, deleteTask };
