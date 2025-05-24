# Auction Platform Project Logo: 

![image](https://github.com/user-attachments/assets/79f5fe3c-07cd-4bf2-ae56-1f407264fb3e)


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


Example:

home : 
![image](https://github.com/user-attachments/assets/78e673cf-1baa-468c-8eb1-8d3debee4393)


signup : 

![image](https://github.com/user-attachments/assets/a4f83173-9883-42c4-97bd-6bc794fe4791)


Dashboard : 

01
![image](https://github.com/user-attachments/assets/96bbbbdc-e84b-4874-9053-5b96e5c7e525)

02

![image](https://github.com/user-attachments/assets/09519ab1-9b24-4d9a-a999-80e893c8ecac)

02
![image](https://github.com/user-attachments/assets/192e125c-e9b0-4c36-b550-221f283b0288)



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


