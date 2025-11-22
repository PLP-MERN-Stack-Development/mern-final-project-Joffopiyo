# Task Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks with real-time updates and user authentication.

## 📋 Project Description

This Task Management System is a modern, full-featured web application designed to help users organize and track their tasks efficiently. Built with the MERN stack, it provides a seamless user experience with real-time updates, allowing multiple users to collaborate and see changes instantly.

### Key Highlights

- **Secure Authentication**: User registration and login system with JWT-based authentication and password encryption using bcrypt
- **Real-time Collaboration**: Socket.io integration enables instant task updates across all connected clients
- **Intuitive Interface**: Clean, responsive UI built with React and styled with Tailwind CSS v3
- **RESTful API**: Well-structured backend API with proper error handling and validation
- **Database Management**: MongoDB for efficient data storage and retrieval
- **Testing**: Comprehensive test suite using Jest and Supertest for backend validation
- **Modern Development**: Built with Vite for fast development and optimized production builds

### Use Cases

This application is perfect for:
- Individual task management and productivity tracking
- Small team collaboration on projects
- Learning full-stack development with the MERN stack
- Understanding real-time web application architecture
- Portfolio demonstration of modern web development skills

## ✨ Features

- **User Authentication**: Register and Login with JWT
- **Task Management**: Create, Read, Update, Delete tasks
- **Real-time Updates**: Task updates are broadcasted to all connected users via Socket.io
- **Responsive Design**: Built with TailwindCSS for mobile and desktop
- **Secure**: Password hashing with bcrypt, JWT token authentication
- **Error Handling**: Comprehensive error handling on both frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Socket.io-client** - Real-time communication
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Jest & Supertest** - Testing framework

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_secret_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:5000`

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

The frontend will run on `http://localhost:5173`

## 🧪 Testing

To run backend tests:
```bash
cd backend
npm test
```

## 📁 Project Structure

```
mern-final-project/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── tests/           # Test files
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   ├── api/         # API configuration
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables (MONGODB_URI, JWT_SECRET, PORT)
4. Deploy from the `backend` directory

### Frontend Deployment (Vercel/Netlify)
1. Create a new project
2. Connect your GitHub repository
3. Set build directory to `frontend`
4. Set build command to `npm run build`
5. Set publish directory to `frontend/dist`
6. Deploy

## 🎥 Demo

### Video Demo
[Link to video demo]

### Live Application
- **Frontend**: [Link to deployed frontend]
- **Backend API**: [https://mern-final-project-joffopiyo.onrender.com](https://mern-final-project-joffopiyo.onrender.com)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is for educational purposes as part of the PLP MERN Stack Development course.

## 👨‍💻 Author

**Joffopiyo**
- GitHub: [@Joffopiyo](https://github.com/Joffopiyo)

---

Made with ❤️ using the MERN Stack
