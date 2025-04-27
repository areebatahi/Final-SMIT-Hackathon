import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask
} from '../controller/taskController.mjs';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id/move', moveTask);

export default router;
