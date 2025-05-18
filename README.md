# Auction Platform Project

## Overview
This project is a full-stack auction platform application that allows users to create auctions, place bids, view auction details, and manage their profiles. It includes features for commission submission, dashboards for users and super admins, and various utility components.

The project consists of two main parts:
- **Frontend:** A React application built with Vite, React Router, Redux, and Tailwind CSS for styling.
- **Backend:** An Express.js server providing RESTful APIs for user authentication, auction management, bidding, commissions, and administrative functions.

## Frontend

- Located in the `frontend/` directory.
- Built with React 18, using React Router v7 for client-side routing.
- State management is handled with Redux Toolkit.
- Styling is done using Tailwind CSS.
- The frontend is developed and served using Vite.
- Routes include pages for home, login, signup, auctions, user profile, dashboard, and more.
- React Router is configured with `BrowserRouter`.
- To prevent page refresh issues with React Router, ensure the server redirects all routes to `index.html` in production.
- Development server runs on `http://localhost:5173` by default.

### Running Frontend

```bash
cd frontend
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## Backend

- Located in the `backend/` directory.
- Built with Node.js and Express.js.
- Provides REST API endpoints under `/api/v1/` for users, auction items, bids, commissions, and super admin.
- Uses middleware for authentication, error handling, and other utilities.
- Connects to a database (details in `backend/database/connection.js`).
- Server entry point is `backend/server.js`.
- Runs on a configurable port (via environment variables).

### Running Backend

```bash
cd backend
npm install
npm start
```

## React Router Refresh Issue

When using React Router with client-side routing, refreshing a page on a route other than `/` can cause the server to return a 404 or redirect to the home page. To fix this:

- In development, Vite's dev server handles this automatically.
- In production, configure your server or hosting platform to redirect all routes to `index.html`.
- For example:
  - **Vercel:** Add `vercel.json` with rewrites.
  - **Netlify:** Add `_redirects` file.
  - **Express:** Add a catch-all route serving `index.html`.

## Adding UI Screenshots

To add screenshots of the UI in this README:

1. Place your screenshot images inside the `frontend/public/` directory (or any accessible folder).
2. Reference the images here using Markdown syntax:

```markdown
![Dashboard](frontend/public/screenshots/dashboard.png)
```

Example:

![Dashboard](frontend/public/screenshots/dashboard.png)

![image](https://github.com/user-attachments/assets/e3ed9e4a-4493-4529-95f9-0b72b6c38f32)


(Add your actual screenshots in the specified folder and update the paths accordingly.)

## Technologies Used

- Frontend: React, React Router, Redux Toolkit, Tailwind CSS, Vite
- Backend: Node.js, Express.js, MongoDB (assumed from typical stack)
- Other: Axios, React Toastify, Chart.js, Cloudinary (for image uploads)

## Project Structure

```
/frontend
  /src
    /pages
    /components
    /store
  vite.config.js
  package.json

/backend
  /controller
  /middlewares
  /models
  /router
  app.js
  server.js
  package.json
```

## Conclusion

This project provides a comprehensive auction platform with a modern React frontend and a robust Express backend. It supports user authentication, auction management, bidding, and administrative dashboards.

For any issues or contributions, please open an issue or pull request.
