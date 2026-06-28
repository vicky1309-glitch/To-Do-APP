# 🔥 Task Tracker App
### VIKNESH V | RD INFRO TECHNOLOGY — Full Stack Internship
#### Task 1: Requirement Analysis & Project Setup

---

## 👨‍💻 About This Project

A full-stack Task Tracker application built from scratch by **VIKNESH V** as part of the
RD INFRO TECHNOLOGY Full Stack Development Internship (Task 1).

Unlike a basic to-do list, this app includes **priority levels** (High / Medium / Low),
**filter tabs**, **toast notifications**, and a fully custom **Sunset Orange & Red** dark theme.

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js, Axios, CSS Variables    |
| Backend   | Node.js, Express.js               |
| Database  | MySQL (via mysql2 + pool)         |
| Dev Tools | Nodemon, dotenv, CORS             |

---

## 📁 Project Structure

```
viknesh-todo/
├── backend/
│   ├── config/
│   │   └── db.js               # MySQL pool connection
│   ├── controllers/
│   │   └── taskController.js   # Business logic
│   ├── models/
│   │   └── taskModel.js        # SQL queries + auto table init
│   ├── routes/
│   │   └── taskRoutes.js       # REST API routes
│   ├── server.js               # Express entry point
│   ├── .env                    # DB credentials (not pushed to git)
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html          # React HTML shell
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Sunset theme styles
│   │   └── index.js            # React DOM render
│   ├── .env                    # API base URL
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup & Run

### Step 1 — MySQL Setup
Open MySQL and run:
```sql
CREATE DATABASE viknesh_taskdb;
```
The `tasks` table is **auto-created** when the backend starts.

### Step 2 — Backend
```bash
cd backend
npm install
# Edit .env with your MySQL password
npm run dev
```

### Step 3 — Frontend
```bash
cd frontend
npm install
npm start
```

Visit: **http://localhost:3000**

---

## 🔐 Environment Variables

### `backend/.env`
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=viknesh_taskdb
```

### `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 API Reference

| Method | Endpoint          | Body Fields                              | Description       |
|--------|-------------------|------------------------------------------|-------------------|
| GET    | /api/tasks        | —                                        | Get all tasks     |
| GET    | /api/tasks/:id    | —                                        | Get one task      |
| POST   | /api/tasks        | task_title, task_note, priority          | Create task       |
| PUT    | /api/tasks/:id    | task_title, task_note, priority, is_done | Update task       |
| DELETE | /api/tasks/:id    | —                                        | Delete task       |

---

## ✨ Features

- 🔴 Priority levels: High / Medium / Low with color badges
- 🔥 Sunset Orange & Red custom dark theme
- 📊 Live stats: Total / Pending / Done counter
- 🔔 Toast notifications for all actions
- 🔍 Filter tabs: All / Pending / Done
- 📱 Responsive design for mobile & desktop
- 🔒 `.env` excluded from Git (credentials safe)

---

## 👤 Author

**VIKNESH V**
RD INFRO TECHNOLOGY — Full Stack Development Intern

`#RDINFROTECH` `#internship44`
