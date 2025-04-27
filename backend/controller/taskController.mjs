import Task from "../schema/taskSchema.mjs";

// Create a new Task
const createTask = async (req, res) => {
  const { title, status } = req.body; // Removed description and assignedTo
  if (!title || !status) {
    return res.status(400).json({ message: 'Title and status are required' });
  }

  const task = new Task({ title, status });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { title, status } = req.body; // Validate inputs here if needed
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { title, status }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

// Move Task (Change Status)
const moveTask = async (req, res) => {
  const { status } = req.body; // Expecting status in request body

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status; // Update task status
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task status', error: error.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask, moveTask };
