import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from '../controller/taskController.mjs'

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks:id', updateTaskStatus);
router.delete('/tasks:id', deleteTask);

export default router;