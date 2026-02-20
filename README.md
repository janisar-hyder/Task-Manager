# Task Management Application

A production-ready, full-stack Task Management Application built with Node.js, Express, React, and Tailwind CSS. It features a file-system based local JSON database.

## Features
- Create, Read, Update, and Delete (CRUD) tasks
- Filter tasks by status (Pending, In Progress, Completed)
- Responsive, mobile-first design
- Smooth UI/UX with loading states and toast notifications
- Local JSON file persistence

## Tech Stack
**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios
- Lucide React (Icons)
- React Hot Toast

**Backend:**
- Node.js & Express.js
- `fs/promises` for JSON storage
- UUID
- CORS & Dotenv

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example (optional, defaults to 5000):
   ```bash
   cp .env.example .env
   ```
4. Start the server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on `http://localhost:3000`):
   ```bash
   npm run dev
   ```

## Documentation
- See `API.md` for detailed endpoint behaviors and examples.

## Design Decisions
- **Local JSON Database**: Chosen per requirements to avoid traditional databases while maintaining persistence and demonstrating Node.js file system capabilities.
- **Tailwind CSS**: Adopted for utility-first, rapid, and responsive styling.
- **Component Architecture**: Kept logic clear by isolating API calls in `services/api.js` and managing global state at the `App.jsx` level, delegating display specific logic to child components.

