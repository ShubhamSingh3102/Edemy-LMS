# 🎓 Edemy LMS - Full Stack Learning Management System

A complete Learning Management System (LMS) built using the MERN Stack. This platform allows educators to create and manage courses while students can enroll, purchase courses, track progress, watch lectures, and rate courses.

## 🚀 Live Demo

### Frontend
https://edemy-lms-frontend-three.vercel.app

### Backend API
https://edemy-lms-backend-nine.vercel.app

---

## 🌐 Live Demo

🔗 Frontend:
https://edemy-lms-frontend-three.vercel.app

🔗 Backend API:
https://edemy-lms-backend-nine.vercel.app


## 📌 Features

### 👨‍🎓 Student Features

- User Authentication with Clerk
- Browse Available Courses
- Search Courses
- Course Details Page
- Secure Course Purchase with Stripe
- Enroll in Courses
- Watch Course Lectures
- Track Learning Progress
- Mark Lectures as Completed
- Rate Purchased Courses
- Responsive UI

### 👨‍🏫 Educator Features

- Educator Dashboard
- Create New Courses
- Upload Course Thumbnail
- Add Chapters & Lectures
- Manage Courses
- Track Enrollments
- View Earnings
- View Student Enrollments
- Course Analytics

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- React YouTube

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Authentication

- Clerk Authentication

### Payments

- Stripe Payment Gateway

### Media Storage

- Cloudinary

### Deployment

- Vercel

---

## 📂 Project Structure

```bash
Edemy-LMS/
│
├── client/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── context/
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/ShubhamSingh3102/Edemy-LMS.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run server
```

---

## 🔑 Environment Variables

### Frontend (.env)

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BACKEND_URL=
VITE_CURRENCY=
```

### Backend (.env)

```env
MONGODB_URI=
CLERK_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CURRENCY=
```

---

## 📸 Screenshots

### Home Page
- Hero Section
- Course Listings
- Search Functionality

### Educator Dashboard
- Total Enrollments
- Total Courses
- Total Earnings

### Course Management
- Add Course
- Add Chapters
- Add Lectures

### Student Panel
- Enrolled Courses
- Video Lectures
- Progress Tracking

---

## 🎯 Learning Outcomes

Through this project I learned:

- Full Stack MERN Development
- REST API Development
- Authentication & Authorization
- Payment Gateway Integration
- Cloud Storage Management
- Database Design
- State Management
- Deployment & Production Setup

---

## 🔮 Future Improvements

- AI Course Assistant (RAG + LLM)
- AI Quiz Generator
- AI Doubt Solver
- Course Recommendation System
- Certificate Generation
- Live Classes
- Discussion Forum
- Admin Panel

---

## 👨‍💻 Author

**Shubham Singh**

GitHub:
https://github.com/ShubhamSingh3102

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It motivates me to build more projects and contribute to open source.
