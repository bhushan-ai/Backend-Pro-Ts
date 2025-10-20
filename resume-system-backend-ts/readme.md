# 🧠 Resume Builder Backend

A Node.js + Express + MongoDB backend that allows users to **create, update, fetch, and delete resumes**, with **authentication** and potential **cross-platform integration** (GitHub, LinkedIn, etc.).

---

## 🚀 Features

- 🔐 **User Authentication** (via JWT)
- 📄 **Resume Management APIs** – create, update, delete, fetch resumes
- 🧾 **MongoDB + Mongoose** models for structured data
- 🌍 **Cross-platform ready** – connect with web or mobile apps
- 📧 Optional: Integrate with Cloudinary, Gmail (Nodemailer), or GitHub API

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CORS + dotenv**

---

## 📦 Installation

# 1. Clone the repository
```bash

git clone https://github.com/bhushan-ai/resume-backend.git
````

# 2. Navigate to the folder
```
cd resume-backend
```
# 3. Install dependencies
```
npm install
```
# 4. Create an .env file and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
````

# 5. Run the development server
```
npm run dev
```
