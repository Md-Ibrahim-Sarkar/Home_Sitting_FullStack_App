"Create a fully functional Node.js backend using Express and MongoDB with JWT authentication and Firebase authentication. The backend should have the following features:"

User Authentication:
JWT-based login and registration (No bcrypt for password hashing).
Firebase authentication (Verify Firebase token and store user data in MongoDB).
Middleware for JWT authentication.
User Management:
Store users in MongoDB using Mongoose schema.
Fetch user list from MongoDB (protected route).
Security & Best Practices:
Use environment variables for sensitive data (like Firebase credentials, JWT secret, etc.).
Implement CORS for cross-origin access.
Generate JWT token for user authentication during login and registration (Firebase auth).
Endpoints Required:
POST /register → Register new users (JWT generation).
POST /login → Authenticate users with Firebase, return JWT token.
POST /firebase-auth → Authenticate users via Firebase and return JWT token.
GET /users → Get list of users (Protected route).
Setup & Dependencies:
Use express, mongoose, jsonwebtoken, dotenv, cors, and firebase-admin.
Connect to MongoDB using Mongoose.
Use express.json middleware.
No bcrypt.js, as Firebase auth will handle the user authentication and JWT generation.
Ensure the code is modular, well-documented, and optimized for scalability. Return a fully functional backend code.