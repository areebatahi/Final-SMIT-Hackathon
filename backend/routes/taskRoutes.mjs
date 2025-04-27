import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controller/taskController.mjs'

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks:id', getTaskById);
router.put('/tasks:id', updateTask);
router.delete('/tasks:id', deleteTask);

export default router;