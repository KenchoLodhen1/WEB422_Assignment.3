# 📚 Assignment 3 – Library Management System

A full-stack application with **Next.js frontend** and **Node.js/Express backend** for managing books in a library, with borrowing and returning features, plus authentication via **NextAuth** and IBM App ID.

---

## 📌 Features
### **Frontend**
- Built with Next.js and React
- User authentication with NextAuth + IBM App ID
- Add, edit, delete books
- Borrow/return books
- Display borrowed status and borrower
- Tailwind CSS dark mode styling

### **Backend**
- Node.js + Express server
- RESTful API endpoints for books CRUD and borrow/return logic
- Middleware for authentication and JSON parsing
- CORS enabled for frontend requests
- In-memory or MongoDB-based persistence (depending on setup)

---

## 🗂 Project Structure
```
ASSIGNMENT.3/
│
├── backend/               # Backend Express API
│   ├── routes/            # Express routes for books & borrow/return
│   ├── controllers/       # Controller logic for handling API requests
│   ├── models/            # Mongoose models (if MongoDB used)
│   ├── server.js          # Express app entry point
│   └── package.json       # Backend dependencies and scripts
│
├── frontend/              # Next.js application
│   ├── lib/               # Shared utilities
│   │   ├── api.js         # Axios API client
│   │   └── bookStore.js   # Shared in-memory store for API routes (dev only)
│   │
│   ├── pages/             # Next.js pages
│   │   ├── api/           # API routes (Next.js)
│   │   │   ├── books/     # Books CRUD API
│   │   │   │   ├── index.js    # GET all books / POST add book
│   │   │   │   └── [id].js     # PUT edit / DELETE book
│   │   │   └── borrow/    # Borrow API
│   │   │       └── [id].js     # POST borrow / DELETE return
│   │   ├── borrow.js      # Borrow/Return UI page
│   │   ├── index.js       # Home page with book list and add/edit form
│   │   └── _app.js        # Global app wrapper
│   │
│   ├── components/        # Reusable components
│   │   ├── BookForm.js
│   │   └── BookList.js
│   │
│   ├── public/            # Static files
│   └── styles/            # Tailwind base styles
│
├── .gitignore             # Ignore rules for frontend and backend
└── README.md              # Project documentation
```

---

## 🛠 Tech Stack

### **Frontend**
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [NextAuth.js](https://next-auth.js.org/)

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [Mongoose](https://mongoosejs.com/) (optional for persistence)
- [IBM App ID](https://www.ibm.com/cloud/app-id)

---

## 🔑 Environment Variables

### **Frontend** – `frontend/.env.local`
```env
NEXTAUTH_SECRET=your_nextauth_secret
IBM_APP_ID_CLIENT_ID=your_client_id
IBM_APP_ID_TENANT_ID=your_tenant_id
IBM_APP_ID_DISCOVERY_URL=your_discovery_url
NEXTAUTH_URL=http://localhost:3000
```

### **Backend** – `backend/.env`
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string   # only if using MongoDB
JWT_SECRET=your_jwt_secret
```
**Never commit `.env` files** – they’re in `.gitignore`.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd frontend
npm install
```

### 2️⃣ Run Backend Server
```bash
cd backend
npm start     # or npm run dev (if nodemon is installed)
```

### 3️⃣ Run Frontend Dev Server
```bash
cd frontend
npm run dev
```
Frontend will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

### **Backend**
#### Books
- `GET /api/books` – List all books
- `POST /api/books` – Add a new book
- `PUT /api/books/:id` – Update a book
- `DELETE /api/books/:id` – Delete a book

#### Borrow/Return
- `POST /api/borrow/:id` – Borrow a book
- `DELETE /api/borrow/:id` – Return a book

### **Frontend (Next.js API routes)**
- Acts as a proxy to backend for authenticated requests
- Implements same endpoints as backend

---

## 🖥 Usage Flow

### Add a Book
1. Sign in with IBM App ID.
2. Go to homepage and fill **Title**, **Author**, **ISBN**.
3. Click **Save**.

### Borrow a Book
1. Navigate to **Borrow / Return** page.
2. Select a book and click **Borrow**.

### Return a Book
1. Navigate to **Borrow / Return** page.
2. Select a borrowed book and click **Return**.

---

## ⚠️ Notes
- Default setup uses in-memory storage in dev; restart clears data.
- Connect backend to MongoDB for persistence.

---

## 📜 License
For educational use in **WEB422 – Assignment 3**.
