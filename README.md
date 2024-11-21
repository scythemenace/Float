# Float: A Simple Banking Web Application Simulator

Float is a secure and user-friendly banking web application simulator that allows users to perform financial transactions, manage profiles, and experience seamless authentication. Designed with data integrity and performance in mind, Float offers a robust platform for simulating banking activities.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Setup and Installation](#setup-and-installation)
4. [Application Workflow](#application-workflow)
5. [File Structure](#file-structure)
6. [Development Practices](#development-practices)
7. [Demo](#demo)
8. [Future Improvements](#future-improvements)

---

## Technologies Used

- **Frontend**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Backend**: [Express.js](https://expressjs.com/) + [Node.js](https://nodejs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Design**: [TailwindCSS](https://tailwindcss.com/)
- **Authentication**: Custom authentication using [JWT](https://jwt.io/) and [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## Features

### Core Functionalities:
1. **User Authentication**:
   - Secure sign-up and login using JWT for token-based authentication.
   - Passwords hashed with bcrypt before storage for enhanced security.

2. **Atomic Transactions**:
   - Transfers between users are ensured to be atomic, leveraging MongoDB’s transaction feature.
   - Prevents partial updates (e.g., deduction without addition).

3. **Random Balance Allocation**:
   - On sign-up, each user is assigned a random balance to simulate initial funds.

4. **Search and Send**:
   - Users can search for other registered users and send money to them directly.

5. **Profile Management**:
   - Users can update their profiles dynamically.

6. **Automatic Redirection**:
   - Persistent login sessions ensure users are redirected to their dashboard upon revisiting.

### Performance Enhancements:
- **Debouncing**:
  - Optimized performance in input fields to reduce unnecessary re-renders.

---

## Setup and Installation

### Prerequisites:
- **Node.js** (v16 or higher)
- **MongoDB** installed locally or hosted on a cloud platform.

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd float
   ```

2. Set up the Backend:
   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` directory with the following:
     ```
     FRONTEND_URL=<your-frontend-url>
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     ```

   - Start the server:
     ```bash
     npm start
     ```

3. Set up the Frontend:
   ```bash
   cd ../frontend
   npm install
   ```

   - Create a `.env` file in the `frontend` directory with the following:
     ```
     VITE_API_URL=<your-backend-url>
     ```
     
   - Start the server:
     ```bash
     npm run dev
     ```

4. Open the application in your browser at:
   ```
   http://localhost:<frontend-port>
   ```

---

## Application Workflow

1. **User Signs Up/Logs In**:
   - Users are assigned a random balance upon sign-up.
   - Credentials are securely handled with JWT for token authentication.
   - Persistent login allows users to bypass repeated logins.

2. **Transaction Execution**:
   - Uses MongoDB transactions to ensure atomicity.
   - If any issue occurs during deduction/addition, the entire transaction is rolled back.

3. **Search and Send**:
   - Users can search for other registered users by name and transfer money to them.

4. **Profile Updates**:
   - Users can dynamically update their profile information, which gets reflected in the UI instantly.

5. **Dashboard Redirection**:
   - After authentication, users are redirected to a personalized dashboard showing their current balance.

---

## File Structure

### Backend
```
backend/
│
├── config/               # Configuration files (e.g., input validation, JWT secrets)
├── db/                   # Database connection and schema definitions
├── middlewares/          # Custom middleware logic
├── routes/               # API route definitions
├── public/               # Static assets
└── index.js              # Main server file
```

### Frontend
```
frontend/
│
├── src/                  # React components and logic
├── public/               # Public assets (favicon, images, etc.)
├── tailwind.config.js    # TailwindCSS configuration
├── vite.config.js        # Vite configuration
└── index.html            # Entry point
```

---

## Development Practices

1. **Custom Authentication**:
   - Designed from scratch to securely manage user sessions with JWT and hashed passwords.

2. **Atomic Transactions**:
   - Handled critical operations like fund transfers using MongoDB's transactional capabilities.

3. **Performance Optimization**:
   - Debouncing techniques applied to prevent redundant renders and enhance input performance.

4. **Design Consistency**:
   - TailwindCSS used to ensure responsive and clean UI design.

---

## Demo

You can view this website live [here](https://float-frontend.onrender.com/).
### Note:- The backend server is on a free tier, so it may take some time to load if inactive. Please be patient.

---

## Future Improvements

- Add support for third-party authentication (e.g., Google, Facebook).
- Implement detailed transaction history with filtering options.
- Enhance UI/UX with advanced TailwindCSS components.
- **Auto-Fetch Balance Updates**:
  - Implement polling to the database to automatically fetch balance changes in real-time.
- Integrate email notifications for key user actions.

---
