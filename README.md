# Backend-Pro-Ts

Welcome to **Backend-Pro-Ts** — a curated collection of backend projects built with **TypeScript**, **Node.js**, and **Express.js**. This repository serves as a showcase of my journey in mastering backend development, focusing on best practices, scalability, and maintainability.

## 🚀 Projects Overview

Each folder in this repository represents a distinct backend project, demonstrating various concepts and technologies:

### 🔑 **auth-backend-ts**
A user authentication system featuring:
- JWT-based authentication  
- Role-based access control  
- Secure password hashing with **bcrypt**  
- MongoDB integration using **Mongoose**  

### ✅ **task-manager-ts**
A task management system built with **TypeScript + Express + MongoDB**.  
Features:
- User authentication with **JWT & cookies**  
- CRUD operations for tasks  
- Secure password update flow  
- Task ownership enforcement (tasks are linked to the logged-in user)  
- Proper validation & error handling  

---
## 🛠️ Technologies Used

The projects in this repository utilize a range of modern backend technologies:

- **Node.js** → JavaScript runtime for building scalable server-side apps  
- **Express.js** → Web framework for building RESTful APIs  
- **TypeScript** → Superset of JavaScript with static typing  
- **Mongoose** → MongoDB object modeling tool  
- **bcrypt** → Password hashing library  
- **jsonwebtoken (JWT)** → Secure token-based authentication  
- **dotenv** → Manage environment variables  
- **cookie-parser** → Handle cookies in Express  
- **nodemon** → Auto-restart server on code changes  


## 📦 Installation & Setup

To get started with any of the projects:

1. Clone the repository:

   ```bash
   git clone https://github.com/bhushan-ai/Backend-Pro-Ts.git
   cd Backend-Pro-Ts
    ```

2. Navigate to the desired project folder:
```
cd auth-backend-ts
```

3.Install dependencies:
```
npm install
```
4. Create a .env file based on the provided .env.example and set your environment variables.
5. Run the development server:
   ```
    npm run dev
   ```
