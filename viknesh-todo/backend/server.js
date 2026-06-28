/**
 * ╔══════════════════════════════════════════════════════╗
 * ║         TASK TRACKER — Backend Entry Point           ║
 * ║  Author  : VIKNESH V                                 ║
 * ║  Company : RD INFRO TECHNOLOGY                       ║
 * ║  Task    : Task 1 — Requirement Analysis & Setup     ║
 * ║  Stack   : Node.js + Express.js + MySQL              ║
 * ╚══════════════════════════════════════════════════════╝
 */

const express    = require('express');
const cors       = require('cors');
const dotenv     = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware Setup ─────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Request Logger (custom by Viknesh) ──────────────────
app.use((req, _res, next) => {
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// ── API Routes ───────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

// ── Root Health Check ────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    author  : 'VIKNESH V',
    company : 'RD INFRO TECHNOLOGY',
    task    : 'Task 1 — Project Setup Complete ✅',
    status  : 'Server is live',
    port    : PORT,
  });
});

// ── 404 Catch-All ────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// ── Global Error Handler ─────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled Error ▶', err.message);
  res.status(500).json({ success: false, message: 'Something went wrong on the server' });
});

// ── Start ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════╗');
  console.log('║  VIKNESH V — RD INFRO TECHNOLOGY     ║');
  console.log(`║  Server live → http://localhost:${PORT}  ║`);
  console.log('╚══════════════════════════════════════╝');
});
