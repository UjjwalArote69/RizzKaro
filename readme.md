# 💬 RizzKaro

RizzKaro is an AI-powered MERN stack social media app that lets users generate stylish Rizz 💘, savage Roasts 🔥, and wholesome Compliments 🌟 using the Gemini API. Users can share generated replies, post to feeds, and interact with dynamic content—all in a fun, modern UI.

---

## 🌐 Live Demo

> 🔗 Frontend (Vercel): [https://rizz-karo.vercel.app](https://rizz-karo.vercel.app)\
> 🔗 Backend (Railway): [https://rizzkaro-production.up.railway.app](https://rizzkaro-production.up.railway.app)

---

## 💪 Tech Stack

| Layer          | Tech                                 |
| -------------- | ------------------------------------ |
| Frontend       | React, Vite, Tailwind CSS            |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB Atlas                        |
| Authentication | JWT                                  |
| AI Service     | Gemini API (via Google AI Studio)    |
| Hosting        | Railway (Backend), Vercel (Frontend) |

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 🧠 Generate Replies using Gemini (Rizz, Roast, Compliment)
- 📝 Post Replies to Feed
- 📜 My Replies History
- 🚀 Fully Responsive UI
- 🛡️ Protected Routes using Middleware

---

## 📁 Folder Structure

```
RizzKaro/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── middleware/
│   ├── config/
│   ├── public/
│   └── server.js
├── Frontend/
    ├── components/
    ├── pages/
    ├── context/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

## ⚙️ Environment Variables

### 🔐 Backend `.env`

```
PORT=3000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 🌐 Frontend `.env`

```
VITE_API_URL=https://rizzkaro-production.up.railway.app
```

---

## 📦 Installation & Running Locally

### Clone the Repository

```bash
git clone https://github.com/UjjwalArote69/RizzKaro.git
cd RizzKaro
```

### ⏱️ Start Backend

```bash
cd Backend
npm install
touch .env
# Add env vars as shown above
node server.js
```

### ⚡ Start Frontend

```bash
cd ../Frontend
npm install
touch .env
# Add env var: VITE_API_URL
npm run dev
```

---

## 📡 API Endpoints

### Auth Routes `/api/users`

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/register` | Register new user |
| POST   | `/login`    | Login with JWT    |

---

### Reply Routes `/api/reply`

| Method | Endpoint          | Protected | Description               |
| ------ | ----------------- | --------- | ------------------------- |
| POST   | `/generate-reply` | ✅ Yes     | Generate reply via Gemini |
| GET    | `/myreplies`      | ✅ Yes     | Get user's reply history  |

---

### Post Routes `/api/posts`

| Method | Endpoint | Protected | Description             |
| ------ | -------- | --------- | ----------------------- |
| POST   | `/`      | ✅ Yes     | Share a reply as a post |
| GET    | `/feed`  | ✅ Yes     | Get feed posts          |

---

## 🧠 Key Functionalities (Backend)

### 🔹 `generateReply` (Reply Controller)

- Sends user prompt to Gemini API
- Parses and filters Gemini response
- Saves reply to user model
- Creates a new post with the response

### 🔹 `auth.middleware.js`

- Verifies JWT token and attaches user to `req.user`

---

## 🚀 Deployment

### 🔹 Backend (Railway)

1. Push backend folder to GitHub
2. Create new Railway project
3. Link GitHub repo → Select `/Backend`
4. Add environment variables (MONGO\_URI, JWT\_SECRET, etc.)

### 🔹 Frontend (Vercel)

1. Push frontend folder to GitHub
2. Import to Vercel → Select `/Frontend`
3. Add env var `VITE_API_URL` pointing to Railway backend URL
4. Deploy 🎉

---

## 🙌 Acknowledgements

- [Google AI Studio](https://aistudio.google.com/) for Gemini API
- [Tailwind CSS](https://tailwindcss.com/)
- [Render, Railway & Vercel](https://vercel.com/)

---

## 📄 License

MIT © [Ujjwal Arote](https://github.com/UjjwalArote69)

---

> 💡 **Pro Tip**: You can use this as a template for all future MERN + AI projects by replacing only the API logic and endpoints.

