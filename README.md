# ChatStream

**ChatStream** is a full-stack chat application built with **React**, **Node.js**, **Express**, and **MongoDB**. It enables users to register, log in, and participate in one-on-one through a responsive, modern interface styled with Tailwind CSS. The app supports user authentication, message sending, using Zustand for state management and Axios with React Query for API interactions.

## Tech Stack

### **Frontend**
- React, React Router, React Query
- Zustand (state management)
- Tailwind CSS (styling)
- Axios (API requests)
- Lucide React (icons)
- date-fns (timestamp formatting)

### **Backend**
- Node.js, Express
- MongoDB, Mongoose
- JWT (authentication)
- CORS, cookie-parser

### **Tools**
- Vite (frontend build)
- Nodemon (backend development)

## 📂 Project Structure

```plaintext
├── client/ # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/ # ChatList, ChatBox, ChatInfo
│   │   │   └── Navbar.jsx # Navigation with logout
│   │   ├── http/ # API services
│   │   │   ├── authApi.js # Login, signup, logout, getAllUsers
│   │   │   └── chatApi.js # Chat and message operations
│   │   ├── lib/
│   │   │   └── axios.js # Axios instance with token interceptor
│   │   ├── store/ # Zustand stores
│   │   │   ├── useAuthStore.js
│   │   │   └── useUserStore.js
│   │   ├── pages/ # Login, Signup, Chat
│   │   ├── route.jsx # Route
│   │   └── App.jsx
│
├── server/ # Backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/ # Chat and user controllers
│   │   ├── lib/ # MongoDB connection
│   │   ├── middlewares/ # JWT authentication
│   │   ├── models/ # Mongoose models
│   │   │   ├── chat.model.js
│   │   │   ├── messages.model.js
│   │   │   └── user.model.js
│   │   ├── routers/ # Express routes
│   │   │   ├── user.route.js
│   │   │   └── chat.route.js
│   │   └── server.js # Express server
│
└── README.md
