/**
 * taskRoutes.js — API Route Definitions
 * Author  : VIKNESH V
 * Company : RD INFRO TECHNOLOGY
 */

const express = require('express');
const router  = express.Router();
const {
  getAllTasks,
  getTaskById,
  addTask,
  editTask,
  deleteTask,
} = require('../controllers/taskController');

// GET    /api/tasks        → list all tasks
router.get('/',     getAllTasks);

// GET    /api/tasks/:id    → get one task
router.get('/:id',  getTaskById);

// POST   /api/tasks        → create task
router.post('/',    addTask);

// PUT    /api/tasks/:id    → update task
router.put('/:id',  editTask);

// DELETE /api/tasks/:id    → delete task
router.delete('/:id', deleteTask);

module.exports = router;
