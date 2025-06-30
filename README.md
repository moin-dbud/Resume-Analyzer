An intelligent, full-stack resume analyzer that lets users upload their resumes (PDF), extracts text, and provides **AI-generated feedback**, ratings, and suggestions. Built with modern tools like **React**, **Tailwind CSS**, **Clerk Auth**, **Gemini API**, **Node.js**, **MongoDB**, and more.

> ✅ Perfect for job seekers to polish their resumes with real-time, actionable AI feedback!

---

## ✨ Features

- 📄 Upload and extract text from resume (PDF)
- 🤖 Get AI-generated resume feedback using **Gemini API**
- 📝 Suggestions & overall rating to improve your resume
- ⬇️ Export feedback as a downloadable **PDF**
- 🔐 Auth via **Clerk** (Google, Email, etc.)
- 🧠 User data & analysis history stored in **MongoDB**
- 📬 Fully working **Contact Us** section (uses EmailJS)
- ⚡ Smooth UI with **Framer Motion** & **TailwindCSS**
- 📚 Detailed About Us page

---

## 📸 Demo

![Screenshot 2025-06-30 153934](https://github.com/user-attachments/assets/ca95da03-fa1a-4963-b152-d602cfcd8e36)
![Screenshot 2025-06-30 153947](https://github.com/user-attachments/assets/9d897389-26b6-4d9a-9136-71a93b09f15b)

[Live Demo](https://resume-analyzer-three-wine.vercel.app/)

---

## 🔧 Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion
- Clerk (for authentication)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Gemini 1.5 Flash API
- EmailJS

---


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/moin-dbud/resume-analyzer.git
cd resume-analyzer
```

### 2. Setup the Server
```
cd server
npm install
```

- Create a ``` .env ``` file inside ``` /server ```:
```
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

- Run the server:
```
node server.js
```

### 3, Setup the Client
```
cd client
npm install
```

- Create a ``` .env ``` file inside ``` /server ```:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

- Run the frontend:
```
npm run dev
```

---

## 🧪 Testing the App
- Sign up or log in using Clerk auth
- Upload a PDF resume
- Click "Analyze Resume" → then "Get AI Feedback"
- Download the feedback as PDF
- Go to History to view all past feedback
- Visit the Contact Us section to send a message

---

## ## 📞 Contact

Feel free to reach out via [📩 Email](mailto:moinsheikh1303@gmail.com) or visit [My GitHub](https://github.com/moin-dbud).

---

## ✅ License
This project is licensed under the MIT License.

---

## ❤️ Acknowledgments
- [Gemini AI](https://ai.google.dev/)
- [Clerk.dev](https://clerk.dev/)
- [MongoDB](https://www.mongodb.com/)
- [EmailJS](https://www.emailjs.com/)

---

### 🔐 Bonus Tip

> Create a `.env.example` in both `client/` and `server/` folders and push that instead of real `.env`.

Let me know if you want that `.env.example` too.

