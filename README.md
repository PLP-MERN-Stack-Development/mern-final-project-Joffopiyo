# Task Management System

A full-stack MERN application for managing tasks with real-time updates.

## Features
- **User Authentication**: Register and Login with JWT.
- **Task Management**: Create, Read, Update, Delete tasks.
- **Real-time Updates**: Tasks updates are broadcasted to all connected users via Socket.io.
- **Responsive Design**: Built with TailwindCSS.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Socket.io-client
- **Backend**: Node.js, Express, MongoDB, Socket.io

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing
To run backend tests:
```bash
cd backend
npm test
```

## Deployment
- **Backend**: Deploy to Render/Heroku.
- **Frontend**: Deploy to Vercel/Netlify.

## Video Demo
[Link to video demo]

## Live URL
[Link to deployed application]