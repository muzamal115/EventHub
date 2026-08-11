# EventHub

EventHub is a full-stack **MERN event booking application** where users can discover events, create bookings, verify their accounts through OTP, and manage their bookings. Administrators have separate access for managing events and handling bookings.

The project was built to practice and demonstrate real-world **React, TypeScript, Node.js, Express.js, MongoDB, authentication, role-based authorization, file uploads, Cloudinary integration, and email-based OTP workflows**.

---

## Project Overview

EventHub provides separate experiences for normal users and administrators.

Users can:

* Register and verify their account through email OTP
* Login and logout securely
* Browse available events
* View event details
* Book events
* Verify bookings through OTP
* View their bookings
* Cancel bookings

Administrators can:

* Access protected admin routes
* Create events
* Update events
* Upload and replace event images
* Delete events
* View all bookings
* Confirm bookings
* Update payment status when confirming a booking
* Send booking confirmation emails

---

## Features

### Authentication

* User registration
* Email OTP verification
* User login
* Logout
* Authentication persistence using local storage
* Protected routes
* Role-based access control
* Separate user and admin permissions
* Password hashing using bcrypt
* JWT-based authentication

### Event Management

* Browse events
* View event details
* Admin-only event creation
* Admin-only event editing
* Admin-only event deletion
* Event image upload
* Cloudinary image storage
* Optional image replacement while editing
* Event categories
* Event date and location
* Total and available seats
* Ticket pricing

### Booking System

* Authenticated users can book events
* Booking OTP verification
* Users can view their own bookings
* Users can cancel bookings
* Administrators can view all bookings
* Administrators can confirm bookings
* Booking status management
* Payment status management
* Available seats are updated when bookings are confirmed
* Booking confirmation email is sent after confirmation

### User Interface

* Responsive navigation
* Mobile hamburger menu
* Active navigation links
* Separate authentication pages
* User and admin navigation
* Protected pages
* Event creation/edit form reused for both create and edit functionality
* Form validation using React Hook Form and Zod

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* Multer
* Cloudinary
* Nodemailer
* dotenv
* CORS

### Database

MongoDB is used to store application data including:

* Users
* OTP records
* Events
* Bookings

---

## Authentication & Security

EventHub uses a protected authentication and authorization system.

### JWT Authentication

After successful authentication, the backend generates a JWT token. The frontend stores the token and sends it with protected API requests using the `Authorization` header.

```text
Authorization: Bearer <token>
```

### Password Security

User passwords are hashed using **bcrypt** before being stored in the database.

### Protected Routes

Protected backend routes use authentication middleware to ensure that only authenticated users can access them.

### Role-Based Authorization

The application supports two roles:

```text
user
admin
```

Admin-only routes are protected using admin authorization middleware.

A normal user cannot access administrative event management or administrative booking operations.

### OTP Verification

New accounts require email verification through an OTP.

The application also handles unverified users during login by sending a new verification OTP and redirecting them to the OTP verification page.

---

## User Functionality

Authenticated users can:

1. Register an account
2. Verify their email using OTP
3. Login
4. Browse events
5. View event details
6. Book events
7. Verify their booking using OTP
8. View their bookings
9. Cancel bookings
10. Logout

Users do not have access to administrator-only functionality.

---

## Admin Functionality

Administrators have additional permissions.

Admin users can:

* Access protected admin routes
* Create events
* Edit events
* Delete events
* Upload event images
* Replace event images
* View all bookings
* Confirm bookings
* Manage booking/payment status

Admin accounts are not created by allowing users to select an `admin` role during normal registration. The role is controlled separately.

---

## Event Management

Administrators can create events with information such as:

* Title
* Description
* Date
* Location
* Category
* Total seats
* Available seats
* Ticket price
* Event image

### Image Upload

Event images are uploaded using **Multer** and stored using **Cloudinary**.

For event updates:

* If a new image is selected, the new image is uploaded and the event image is updated.
* If no new image is selected, the existing event image remains unchanged.

This allows the same event form to be used for both creating and editing events.

---

## Booking System

Users can create bookings for available events.

The booking flow includes OTP verification before the booking is processed.

Administrators can review bookings and confirm them.

When a booking is confirmed:

* Booking status becomes `confirmed`
* Payment status is updated to `paid`
* The event's available seat count is decreased
* A booking confirmation email is sent to the user

The application also prevents confirmation when no seats are available.

---

## OTP Verification

EventHub uses OTP verification for two important workflows:

### Account Verification

```text
Register
   ↓
OTP sent by email
   ↓
Verify OTP
   ↓
Account verified
```

If an existing user tries to login while their account is still unverified, the backend sends a new OTP and the frontend redirects the user to the OTP verification page.

### Booking Verification

```text
Create Booking
   ↓
Booking OTP sent
   ↓
Verify OTP
   ↓
Booking verification completed
```

OTP records are stored in MongoDB with an expiration time.

---

## API / Backend Overview

The backend is built with **Node.js and Express.js** and follows a route/controller-based structure.

Main API areas include:

### Authentication

```text
/api/auth
```

Handles:

* Registration
* Login
* OTP verification

### Events

```text
/api/events
```

Handles:

* Event listing
* Event details
* Event creation
* Event updates
* Event deletion

Administrative event operations are protected using authentication and admin middleware.

### Bookings

```text
/api/bookings
```

Handles:

* Creating bookings
* Sending booking OTP
* Verifying booking-related OTP flow
* Getting the authenticated user's bookings
* Getting bookings for administrators
* Confirming bookings
* Cancelling bookings

Protected endpoints use authentication middleware, while administrator operations additionally use admin authorization middleware.

---

## Project Folder Structure

The project is divided into separate client and server applications.

```text
EventHub/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The folder structure represents the application's main organization; individual files may change as the project evolves.

---

## Environment Variables

Create a `.env` file inside the server application.

The required environment variable names used by the project include:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Do not commit actual secrets or credentials to GitHub.**

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd EventHub
```

### 2. Install client dependencies

```bash
cd client
npm install
```

### 3. Install server dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create:

```text
server/.env
```

and add the required environment variables.

### 5. Configure MongoDB

Set the MongoDB connection string in:

```env
MONGODB_URI=
```

### 6. Configure email

Add the email credentials required by Nodemailer:

```env
EMAIL_USER=
EMAIL_PASS=
```

### 7. Configure Cloudinary

Add the Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## How to Run

### Start the Backend

From the `server` directory:

```bash
npm run dev
```

The development server runs on the configured port, which is `5000` by default.

### Start the Frontend

From the `client` directory:

```bash
npm run dev
```

Vite will provide the local development URL for the frontend.

---

## Development Workflow

For local development, run both applications:

```text
Frontend
React + Vite
     │
     │ Axios API requests
     ▼
Backend
Node.js + Express
     │
     ├── MongoDB
     ├── Cloudinary
     └── Nodemailer
```

The frontend communicates with the Express API using Axios.

---

## Future Improvements

The current application covers the core event booking workflow. Possible future improvements include:

* Online payment gateway integration
* Better admin dashboard analytics
* Advanced event search and filtering
* Pagination for events and bookings
* Event capacity and booking validation improvements
* Better email templates and notifications
* Password reset functionality
* More comprehensive server-side validation
* Improved error logging and monitoring
* Automated testing
* Deployment and production configuration
* More granular admin permissions

These are potential future improvements and are **not part of the current implementation**.

---

## Author

**Muzammal Ghafoor**

Full-Stack Web Developer

EventHub was developed as a portfolio project to demonstrate full-stack web development skills including React, TypeScript, Node.js, Express.js, MongoDB, authentication, authorization, REST APIs, file uploads, cloud storage, and email-based workflows.
