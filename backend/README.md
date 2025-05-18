# Backend API Documentation

This document provides an overview of the backend API endpoints for the MERN Auction Platform.

## Table of Contents
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [Get User Profile](#get-user-profile)
    - [User Logout](#user-logout)
    - [Fetch Leaderboard](#fetch-leaderboard)
- [Error Handling](#error-handling)

---

## Installation

1. Clone the repository:
     ```bash
     git clone <repository-url>
     cd backend
     ```

2. Install dependencies:
     ```bash
     npm install
     ```

3. Set up environment variables:
     - Create a `.env` file in the root directory.
     - Add the following variables:
         ```
         CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
         CLOUDINARY_API_KEY=<your-cloudinary-api-key>
         CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
         JWT_SECRET=<your-jwt-secret>
         JWT_EXPIRE=<jwt-expiration-time>
         ```

4. Start the server:
     ```bash
     npm start
     ```

---

## user API Endpoints

### 1. User Registration
**Endpoint:** `/api/v1/register`  
**Method:** `POST`  
**Description:** Registers a new user. Supports uploading a profile image to Cloudinary.

**Request Body:**
```json
{
    "userName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "address": "string",
    "role": "string",
    "bankAccountNumber": "string (optional for Auctioneer)",
    "bankAccountName": "string (optional for Auctioneer)",
    "bankName": "string (optional for Auctioneer)",
    "razorpayId": "string (optional for Auctioneer)",
    "paypalEmail": "string (optional for Auctioneer)"
}
```

**Response:**
- `201 Created`: User registered successfully.
- `400 Bad Request`: Missing or invalid fields.
- `500 Internal Server Error`: Registration failed.

---

### 2. User Login
**Endpoint:** `/api/v1/login`  
**Method:** `POST`  
**Description:** Authenticates a user and generates a JWT token.

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response:**
- `200 OK`: Login successful.
- `400 Bad Request`: Invalid credentials.

---

### 3. Get User Profile
**Endpoint:** `/api/v1/profile`  
**Method:** `GET`  
**Description:** Retrieves the authenticated user's profile.

**Response:**
- `200 OK`: Returns user details.
- `401 Unauthorized`: User not authenticated.

---

### 4. User Logout
**Endpoint:** `/api/v1/logout`  
**Method:** `GET`  
**Description:** Logs out the user by clearing the authentication token.

**Response:**
- `200 OK`: Logout successful.

---

### 5. Fetch Leaderboard
**Endpoint:** `/api/v1/leaderboard`  
**Method:** `GET`  
**Description:** Fetches a leaderboard of users sorted by money spent.

**Response:**
- `200 OK`: Returns the leaderboard.

---

## Error Handling
All errors are handled using a centralized error handler. Errors include:
- `400 Bad Request`: Invalid input or missing fields.
- `401 Unauthorized`: Authentication required.
- `500 Internal Server Error`: Server-side issues.

---

## Notes
- Ensure Cloudinary credentials are correctly configured for image uploads.
- Use a secure JWT secret and expiration time for token generation.

For further assistance, contact the development team.






## Auction API Endpoints

### 1. Add New Auction Item
**Endpoint:** `/api/v1/auctionitem`  
**Method:** `POST`  
**Description:** Adds a new auction item. Supports image upload to Cloudinary.

**Request Body:**
```json
{
    "title": "string",
    "description": "string",
    "category": "string",
    "condition": "string",
    "startingBid": "number",
    "startTime": "ISO 8601 date string",
    "endTime": "ISO 8601 date string",
    "image": "file (required)"
}
```

**Response:**
- `201 Created`: Auction item created successfully.
- `400 Bad Request`: Missing or invalid fields.
- `500 Internal Server Error`: Failed to create auction.

---

### 2. Get All Auction Items
**Endpoint:** `/api/v1/auctionitem`  
**Method:** `GET`  
**Description:** Retrieves all auction items.

**Response:**
- `200 OK`: Returns a list of auction items.

---

### 3. Get Auction Details
**Endpoint:** `/api/v1/auctionitem/auction/:id`  
**Method:** `GET`  
**Description:** Retrieves details of a specific auction item by ID.

**Response:**
- `200 OK`: Returns auction details and bidders.
- `400 Bad Request`: Invalid ID format.
- `404 Not Found`: Auction not found.

---

### 4. Get My Auction Items
**Endpoint:** `/api/v1/auctionitem/my`  
**Method:** `GET`  
**Description:** Retrieves auction items created by the authenticated user.

**Response:**
- `200 OK`: Returns a list of user's auction items.

---

### 5. Remove Auction Item
**Endpoint:** `/api/v1/auctionitem/:id`  
**Method:** `DELETE`  
**Description:** Deletes an auction item by ID.

**Response:**
- `200 OK`: Auction item deleted successfully.
- `400 Bad Request`: Invalid ID format.
- `404 Not Found`: Auction not found.

---

### 6. Republish Auction Item
**Endpoint:** `/api/v1/auctionitem/:id/republish`  
**Method:** `PUT`  
**Description:** Republishes an auction item with new start and end times.

**Request Body:**
```json
{
    "startTime": "ISO 8601 date string",
    "endTime": "ISO 8601 date string"
}
```

**Response:**
- `200 OK`: Auction item republished successfully.
- `400 Bad Request`: Invalid input or auction already active.
- `404 Not Found`: Auction not found.

---

## Notes
- Ensure Cloudinary credentials are correctly configured for image uploads.
- Validate auction start and end times to avoid conflicts.
- Use proper authentication to access user-specific endpoints.
- Handle errors gracefully using the centralized error handler.
- Test all endpoints thoroughly before deployment.



### 7. Place a Bid
**Endpoint:** `/api/v1/bid/place/:id`  
**Method:** `POST`  
**Description:** Places a bid on an auction item. Updates the current bid if the bid is valid.

**Request Parameters:**
- `id` (path parameter): The ID of the auction item.

**Request Body:**
```json
{
    "amount": "number"
}
```

**Response:**
- `201 Created`: Bid placed successfully. Returns the updated current bid.
- `400 Bad Request`: Missing or invalid fields.
- `404 Not Found`: Auction item not found or bid amount is invalid.
- `500 Internal Server Error`: Failed to place the bid.

**Notes:**
- The bid amount must be greater than the current bid and the starting bid.
- If the user has already placed a bid, the existing bid will be updated.
- Proper authentication is required to place a bid.
- Ensure error handling is implemented for edge cases.

