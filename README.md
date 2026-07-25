# 💼 Job Portal

A full-stack Job Portal application built using the MERN Stack. It allows job seekers to search and apply for jobs while recruiters can post and manage job listings.

## 🚀 Features

### 👨‍💼 Job Seeker
- User Authentication
- Browse Jobs
- Search & Filter Jobs
- Apply for Jobs
- View Applied Jobs
- Update Profile

### 🏢 Recruiter
- Recruiter Authentication
- Post New Jobs
- Edit/Delete Jobs
- View Applicants
- Manage Company Profile

### 🔐 Admin
- Secure Authentication
- Protected Routes
- Role-Based Access Control

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (Image Upload)
- Clerk Authentication (if used)

---

## 📂 Project Structure

```
Job-Portal/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Adity-code2145/Job-Portal.git
cd Job-Portal
```

### Install Frontend

```bash
cd client
npm install
```

### Install Backend

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLERK_SECRET_KEY=your_clerk_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run Project

Backend

```bash
cd server
npm run server
```

Frontend

```bash
cd client
npm run dev
```

---

## 📸 Screenshots

Add screenshots of your project here.

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork this repository and create a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aditya Raj**

- GitHub: https://github.com/Adity-code2145
- LinkedIn: https://www.linkedin.com/in/aditya-raj-080b79314/
