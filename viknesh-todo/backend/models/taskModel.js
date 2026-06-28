/**
 * taskModel.js — Data Access Layer
 * Author  : VIKNESH V
 * Company : RD INFRO TECHNOLOGY
 *
 * Handles all direct MySQL queries for the tasks table.
 * Auto-creates the table on first run.
 */

const db = require('../config/db');

// ── Auto-create table if not exists ─────────────────────
const initTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      task_id       INT AUTO_INCREMENT PRIMARY KEY,
      task_title    VARCHAR(200)  NOT NULL,
      task_note     TEXT          DEFAULT NULL,
      priority      ENUM('low','medium','high') DEFAULT 'medium',
      is_done       TINYINT(1)    DEFAULT 0,
      created_by    VARCHAR(100)  DEFAULT 'VIKNESH V',
      created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP,
      updated_at    DATETIME      DEFAULT CURRENT_TIMESTAMP
                                  ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await db.query(query);
  console.log('📋 Tasks table is ready');
};

initTable();

// ── Fetch all tasks (newest first) ──────────────────────
const fetchAllTasks = async () => {
  const [rows] = await db.query(
    `SELECT * FROM tasks ORDER BY created_at DESC`
  );
  return rows;
};

// ── Fetch one task by ID ─────────────────────────────────
const fetchTaskById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM tasks WHERE task_id = ?`, [id]
  );
  return rows[0] || null;
};

// ── Insert new task ──────────────────────────────────────
const insertTask = async (title, note, priority) => {
  const [result] = await db.query(
    `INSERT INTO tasks (task_title, task_note, priority)
     VALUES (?, ?, ?)`,
    [title, note || null, priority || 'medium']
  );
  return result.insertId;
};

// ── Update existing task ─────────────────────────────────
const modifyTask = async (id, title, note, priority, is_done) => {
  const [result] = await db.query(
    `UPDATE tasks
     SET task_title = ?, task_note = ?, priority = ?, is_done = ?
     WHERE task_id = ?`,
    [title, note, priority, is_done, id]
  );
  return result.affectedRows;
};

// ── Delete a task ────────────────────────────────────────
const removeTask = async (id) => {
  const [result] = await db.query(
    `DELETE FROM tasks WHERE task_id = ?`, [id]
  );
  return result.affectedRows;
};

module.exports = {
  fetchAllTasks,
  fetchTaskById,
  insertTask,
  modifyTask,
  removeTask,
};
