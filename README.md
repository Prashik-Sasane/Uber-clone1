# UberClone Project Documentation

## Overview

This project is a full-stack Uber clone, consisting of a **Node.js/Express/MongoDB backend** and a **React frontend**.  
Below you'll find the workflow, folder structure, and key responsibilities for both backend and frontend.

---

## Backend (`/server`)

### Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Docker support

### Folder Structure

```
server/
│   .dockerignore
│   .env
│   app.js
│   Dockerfile
│   Readme.md
├── controller/
│     usercontroller.js
├── db/
│     db.js
├── middleware/
│     auth.middleware.js
├── models/
│     blacklistToken.model.js
│     user.js
├── routes/
│     user.routes.js
├── services/
│     user.service.js
```

### Workflow

1. **Entry Point:**  
   `app.js` initializes the Express app, connects to MongoDB, and sets up routes and middleware.

2. **Database Connection:**  
   `db/db.js` handles MongoDB connection using Mongoose.

3. **Routing:**  
   - All user-related routes are defined in `routes/user.routes.js`.
   - Routes include registration, login, profile, and logout.

4. **Controllers:**  
   - `controller/usercontroller.js` contains logic for user actions (register, login, profile, logout).

5. **Models:**  
   - `models/user.js`: User schema, password hashing, JWT methods.
   - `models/blacklistToken.model.js`: For JWT token blacklisting on logout.

6. **Middleware:**  
   - `middleware/auth.middleware.js`: Protects routes by verifying JWT tokens.

7. **Services:**  
   - `services/user.service.js`: Business logic for user operations.

8. **Environment Variables:**  
   - `.env` stores sensitive config (DB URI, JWT secret, etc.).

9. **Docker:**  
   - `Dockerfile` and `.dockerignore` for containerization.

---

## Frontend (`/frontend`)

### Tech Stack

- React (with Vite)
- Context API for state management
- CSS Modules

### Folder Structure

```
frontend/
│   .gitignore
│   eslint.config.js
│   index.html
│   package.json
│   README.md
│   vite.config.js
├── public/
│     vite.svg
├── src/
│   │   App.css
│   │   App.jsx
│   │   index.css
│   │   main.jsx
│   ├── assets/
│   │     react.svg
│   ├── components/
│   │   └── Context/
│   │         UserContext.jsx
│   ├── page/
│         Login.jsx
│         SignUp.jsx
```

### Workflow

1. **Entry Point:**  
   `src/main.jsx` renders the React app.

2. **App Structure:**  
   - `src/App.jsx` is the root component.
   - Routing and global providers (like context) are set up here.

3. **Pages:**  
   - `src/page/Login.jsx`: Login form and logic.
   - `src/page/SignUp.jsx`: Registration form and logic.

4. **Context:**  
   - `src/components/Context/UserContext.jsx`: Manages user authentication state and provides it to the app.

5. **Assets & Styling:**  
   - `src/assets/`: Static images and SVGs.
   - `src/App.css`, `src/index.css`: Global and component styles.

6. **API Communication:**  
   - The frontend communicates with the backend via HTTP requests (e.g., login, register, fetch profile).
   - JWT tokens are stored in context or local storage and sent with requests to protected endpoints.

---

## How It Works

- **User Registration:**  
  User fills the sign-up form (frontend), which sends a POST request to `/user/register` (backend). Backend validates, hashes password, creates user, and returns a JWT token.

- **User Login:**  
  User fills the login form, which sends a POST request to `/user/login`. Backend verifies credentials and returns a JWT token.

- **Profile Access:**  
  Authenticated requests to `/user/profile` return user data. The frontend uses the token to access protected routes.

- **Logout:**  
  User triggers logout, which calls `/user/logout` to blacklist the token and clear authentication state on the frontend.

---

## Development

- **Backend:**  
  - Run with `node server/app.js` or use Docker.
  - Configure `.env` for environment variables.

- **Frontend:**  
  - Run with `npm run dev` inside `/frontend`.
  - Configure API endpoints as needed.

---

## Related Docs

- See route-specific documentation for `/user/register`, `/user/login`, `/user/profile
