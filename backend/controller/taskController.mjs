import Task from '../models/task/taskModel.mjs';

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, status } = req.body;
        const task = new Task({ title, description, assignedTo, status });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
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

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { title, description, assignedTo, status } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, assignedTo, status },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask }