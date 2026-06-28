/**
 * taskController.js — Business Logic Layer
 * Author  : VIKNESH V
 * Company : RD INFRO TECHNOLOGY
 *
 * Each function validates input, calls the model,
 * and returns a consistent JSON response shape.
 */

const Task = require('../models/taskModel');

// ── Helper: standard response builder ───────────────────
const sendResponse = (res, statusCode, success, message, data = null) => {
  const payload = { success, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

// ── GET /api/tasks ───────────────────────────────────────
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.fetchAllTasks();
    const msg = tasks.length
      ? `${tasks.length} task(s) retrieved`
      : 'No tasks found — start adding some!';
    sendResponse(res, 200, true, msg, tasks);
  } catch (err) {
    sendResponse(res, 500, false, `Server error: ${err.message}`);
  }
};

// ── GET /api/tasks/:id ───────────────────────────────────
const getTaskById = async (req, res) => {
  try {
    const task = await Task.fetchTaskById(req.params.id);
    if (!task) return sendResponse(res, 404, false, 'Task not found');
    sendResponse(res, 200, true, 'Task retrieved', task);
  } catch (err) {
    sendResponse(res, 500, false, `Server error: ${err.message}`);
  }
};

// ── POST /api/tasks ──────────────────────────────────────
const addTask = async (req, res) => {
  try {
    const { task_title, task_note, priority } = req.body;

    if (!task_title || task_title.trim() === '') {
      return sendResponse(res, 400, false, 'task_title is required');
    }

    const validPriorities = ['low', 'medium', 'high'];
    const chosenPriority = validPriorities.includes(priority) ? priority : 'medium';

    const newId   = await Task.insertTask(task_title.trim(), task_note, chosenPriority);
    const newTask = await Task.fetchTaskById(newId);
    sendResponse(res, 201, true, 'Task created successfully', newTask);
  } catch (err) {
    sendResponse(res, 500, false, `Server error: ${err.message}`);
  }
};

// ── PUT /api/tasks/:id ───────────────────────────────────
const editTask = async (req, res) => {
  try {
    const { task_title, task_note, priority, is_done } = req.body;
    const affected = await Task.modifyTask(
      req.params.id, task_title, task_note, priority, is_done ?? 0
    );
    if (!affected) return sendResponse(res, 404, false, 'Task not found');
    const updated = await Task.fetchTaskById(req.params.id);
    sendResponse(res, 200, true, 'Task updated successfully', updated);
  } catch (err) {
    sendResponse(res, 500, false, `Server error: ${err.message}`);
  }
};

// ── DELETE /api/tasks/:id ────────────────────────────────
const deleteTask = async (req, res) => {
  try {
    const affected = await Task.removeTask(req.params.id);
    if (!affected) return sendResponse(res, 404, false, 'Task not found');
    sendResponse(res, 200, true, 'Task deleted successfully');
  } catch (err) {
    sendResponse(res, 500, false, `Server error: ${err.message}`);
  }
};

module.exports = { getAllTasks, getTaskById, addTask, editTask, deleteTask };
