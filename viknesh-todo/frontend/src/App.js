/**
 * App.js — Task Tracker UI
 * Author  : VIKNESH V
 * Company : RD INFRO TECHNOLOGY
 * Task    : Task 1 — Full Stack Project Setup
 * Theme   : Sunset Orange & Red
 */

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PRIORITY_COLORS = {
  high   : '#ef4444',
  medium : '#f97316',
  low    : '#fbbf24',
};

function App() {
  const [tasks,      setTasks]      = useState([]);
  const [title,      setTitle]      = useState('');
  const [note,       setNote]       = useState('');
  const [priority,   setPriority]   = useState('medium');
  const [filter,     setFilter]     = useState('all');
  const [loading,    setLoading]    = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [toast,      setToast]      = useState('');

  // Edit state
  const [editId,       setEditId]       = useState(null);
  const [editTitle,    setEditTitle]    = useState('');
  const [editNote,     setEditNote]     = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editLoad,     setEditLoad]     = useState(false);

  // ── Toast ────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // ── Load tasks ───────────────────────────────────────
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/tasks`);
      setTasks(res.data.data || []);
    } catch {
      showToast('⚠️ Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  // ── Add task ─────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setSubmitLoad(true);
      await axios.post(`${BASE_URL}/tasks`, {
        task_title: title.trim(),
        task_note : note.trim(),
        priority,
      });
      setTitle('');
      setNote('');
      setPriority('medium');
      showToast('✅ Task added!');
      loadTasks();
    } catch {
      showToast('❌ Failed to add task.');
    } finally {
      setSubmitLoad(false);
    }
  };

  // ── Open edit modal ──────────────────────────────────
  const openEdit = (task) => {
    setEditId(task.task_id);
    setEditTitle(task.task_title);
    setEditNote(task.task_note || '');
    setEditPriority(task.priority);
  };

  // ── Cancel edit ──────────────────────────────────────
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditNote('');
    setEditPriority('medium');
  };

  // ── Save edited task ─────────────────────────────────
  const handleEditSave = async (task) => {
    if (!editTitle.trim()) return;
    try {
      setEditLoad(true);
      await axios.put(`${BASE_URL}/tasks/${editId}`, {
        task_title : editTitle.trim(),
        task_note  : editNote.trim(),
        priority   : editPriority,
        is_done    : task.is_done,
      });
      showToast('✏️ Task updated!');
      cancelEdit();
      loadTasks();
    } catch {
      showToast('❌ Could not save changes.');
    } finally {
      setEditLoad(false);
    }
  };

  // ── Toggle done/undone ───────────────────────────────
  const handleToggle = async (task) => {
    try {
      await axios.put(`${BASE_URL}/tasks/${task.task_id}`, {
        task_title : task.task_title,
        task_note  : task.task_note,
        priority   : task.priority,
        is_done    : task.is_done ? 0 : 1,
      });
      loadTasks();
    } catch {
      showToast('❌ Could not update task.');
    }
  };

  // ── Delete task ──────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
      showToast('🗑️ Task removed.');
      loadTasks();
    } catch {
      showToast('❌ Could not delete task.');
    }
  };

  // ── Filter ───────────────────────────────────────────
  const visibleTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.is_done;
    if (filter === 'done')    return  t.is_done;
    return true;
  });

  const doneCount    = tasks.filter((t) =>  t.is_done).length;
  const pendingCount = tasks.filter((t) => !t.is_done).length;

  return (
    <div className="vk-app">

      {/* Toast */}
      {toast && <div className="vk-toast">{toast}</div>}

      {/* Edit Modal */}
      {editId && (
        <div className="vk-modal-overlay" onClick={cancelEdit}>
          <div className="vk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vk-modal-header">
              <h3>✏️ Edit Task</h3>
              <button className="vk-modal-close" onClick={cancelEdit}>✕</button>
            </div>
            <div className="vk-modal-body">
              <label className="vk-label">Task Title *</label>
              <input
                className="vk-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                autoFocus
              />
              <label className="vk-label">Note</label>
              <textarea
                className="vk-input vk-textarea"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="Notes (optional)"
                rows={3}
              />
              <label className="vk-label">Priority</label>
              <select
                className="vk-select vk-select-full"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="low">🟡 Low Priority</option>
                <option value="medium">🟠 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>
            <div className="vk-modal-footer">
              <button className="vk-btn-cancel" onClick={cancelEdit}>
                Cancel
              </button>
              <button
                className="vk-btn-save"
                onClick={() => handleEditSave(tasks.find(t => t.task_id === editId))}
                disabled={editLoad || !editTitle.trim()}
              >
                {editLoad ? 'Saving...' : '💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="vk-header">
        <div className="vk-logo"></div>
        <h1>Task Tracker</h1>
        <p className="vk-author">by <strong>VIKNESH V</strong></p>
        <div className="vk-stats">
          <span className="stat-chip pending">{pendingCount} Pending</span>
          <span className="stat-chip done">{doneCount} Done</span>
          <span className="stat-chip total">{tasks.length} Total</span>
        </div>
      </header>

      {/* Add Task Form */}
      <section className="vk-form-section">
        <h2>+ New Task</h2>
        <form className="vk-form" onSubmit={handleAdd}>
          <input
            className="vk-input"
            type="text"
            placeholder="Task title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="vk-input vk-textarea"
            placeholder="Notes (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
          <div className="vk-form-row">
            <select
              className="vk-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">🟡 Low Priority</option>
              <option value="medium">🟠 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <button className="vk-btn-add" type="submit" disabled={submitLoad}>
              {submitLoad ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </section>

      {/* Filter Tabs */}
      <div className="vk-filters">
        {['all', 'pending', 'done'].map((f) => (
          <button
            key={f}
            className={`vk-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <section className="vk-list">
        {loading && <p className="vk-msg">Loading tasks...</p>}

        {!loading && visibleTasks.length === 0 && (
          <div className="vk-empty">
            <span></span>
            <p>No tasks here. Add one above!</p>
          </div>
        )}

        {visibleTasks.map((task) => (
          <div
            key={task.task_id}
            className={`vk-card ${task.is_done ? 'done' : ''}`}
          >
            <div className="vk-card-left">
              <input
                type="checkbox"
                className="vk-checkbox"
                checked={!!task.is_done}
                onChange={() => handleToggle(task)}
              />
              <div className="vk-card-body">
                <h3 className="vk-card-title">{task.task_title}</h3>
                {task.task_note && (
                  <p className="vk-card-note">{task.task_note}</p>
                )}
                <div className="vk-card-meta">
                  <span
                    className="vk-badge"
                    style={{ background: PRIORITY_COLORS[task.priority] }}
                  >
                    {task.priority}
                  </span>
                  <span className="vk-date">
                    {new Date(task.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="vk-card-actions">
              <button
                className="vk-btn-edit"
                onClick={() => openEdit(task)}
                title="Edit task"
              >
                ✏️
              </button>
              <button
                className="vk-btn-del"
                onClick={() => handleDelete(task.task_id)}
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="vk-footer">
        <p></p>
        <p className="vk-tags"></p>
      </footer>
    </div>
  );
}

export default App;
