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

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
# Create .env file with your credentials
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Create `backend/.env`:
```
MONGO_URI=your_mongodb_connection_string
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
PORT=5000
```

## Usage
1. Enter your message in the text area
2. Upload an Excel file (.xlsx) with emails in Column A
3. Click "Send Emails"

## License
MIT