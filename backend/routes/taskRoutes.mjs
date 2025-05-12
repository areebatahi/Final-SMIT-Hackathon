import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask
} from '../controller/taskController.mjs';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/:id/move', moveTask);

export default router;
