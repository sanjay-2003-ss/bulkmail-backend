# BulkMail App

A full-stack application for sending bulk emails efficiently.

## Features
- Upload Excel files with email addresses
- Send custom messages to multiple recipients
- Track email sending status
- Modern and responsive UI

## Tech Stack
- **Frontend**: React, Tailwind CSS, Axios, XLSX
- **Backend**: Node.js, Express, MongoDB, Nodemailer

👉 **Live Demo**  
- 🌐 Frontend: [https://bulkmail-frontend-lemon-five.vercel.app](https://bulkmail-frontend-lemon-five.vercel.app)  
- ⚙️ Backend: [https://bulkmail-backend-mu.vercel.app](https://bulkmail-backend-mu.vercel.app)
- 
## 📘 Overview  

The **BulkMail App** was created to understand how real-world email tools combine frontend interactivity with backend functionality.  
Users can compose messages, add multiple recipients, and send them directly through the integrated backend API.  
While simple in scope, it reflects a realistic flow of how modern web apps handle communication between **client and server**.  

## ✨ Features  

- 📨 **Compose and Send Emails** – Users can add a subject, message, and multiple recipients.  
- 👥 **Bulk Sending** – Supports sending emails to multiple addresses in one request.  
- 💬 **Frontend–Backend Integration** – Uses `fetch()` to send data to the backend API.  
- 📩 **Live Response Feedback** – Displays success or error messages in real time.  
- 💡 **Form Validation** – Basic input validation on both client and server sides.  
- 📱 **Responsive UI** – Fully optimized for desktop and mobile devices using TailwindCSS.  
- ⚡ **Deployed on Vercel** – Both frontend and backend are hosted on separate Vercel environments.  

### Frontend  
- **HTML5** – Page structure and markup  
- **TailwindCSS** – Utility-first styling and responsiveness  
- **JavaScript (ES6)** – Interactivity and API communication  

### Backend  
- **Node.js + Express.js** – Server-side logic and routing  
- **Nodemailer** – Email sending via SMTP  
- **CORS / Body-Parser** – Middleware for request handling  
- **dotenv** – For environment variable management  
- **Vercel** – For serverless backend deployment

 bulkmail/
│
├── frontend/
│ ├── index.html # Main UI
│ ├── style.css # Styling (Tailwind)
│ ├── script.js # API calls & interactivity
│ └── README.md
│
├── backend/
│ ├── server.js # Express server
│ ├── routes/ # API routes
│ ├── controllers/ # Mail handling logic
│ ├── package.json # Dependencies
│ └── .env # Email credentials (not committed)
│
└── README.md

---

## 🔗 Integration Flow  

1. The **frontend** captures email details (recipients, subject, message).  
2. A `fetch()` POST request is sent to the **backend API endpoint**.  
3. The **backend** validates input and triggers **Nodemailer** to send the emails.  
4. The backend returns a JSON response.  
5. The **frontend** displays feedback (success/error) to the user.  

💡 Learning Outcomes
Gained hands-on experience integrating frontend and backend.
Learned to handle HTTP requests and JSON responses using fetch() and Express.
Practiced Nodemailer integration for sending real emails via backend.
Strengthened understanding of CORS, API design, and deployment workflows.
Improved at building responsive UIs with TailwindCSS.
Gained confidence deploying multi-service projects on Vercel.

⚠️ Disclaimer
This project is for educational and practice purposes only.
It is not intended for large-scale or commercial email marketing.
All email operations rely on testing credentials and secure environment variables.

🎯 Outcome

The final version of BulkMail is a fully functional full-stack application combining a responsive frontend with an integrated backend API.
It demonstrates how to build, connect, and deploy separate services while maintaining clean architecture and user-focused design.

🧩 Future Improvements

✅ Add user authentication and login system
✅ Implement email history and templates
✅ Connect with a database (MongoDB or PostgreSQL)
✅ Add analytics for sent and failed emails
✅ Improve error handling and toast notifications

