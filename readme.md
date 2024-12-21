# Runtime Realm Server

- [Live Server Link](https://runtime-realm.vercel.app/)

<details>
  <summary>
      <h3 style="display:inline;">📑 Table of Contents</h3>
  </summary>

   1. **[Overview](#-overview)**  
   2. **[Key Features of Runtime Realm Server](#-key-features-of-bangu-blogs-server)**  
   3. **[Technologies (Packages) Used](#-technologies-packages-used)**  
   4. **[Run the Server Locally](#️-run-the-server-locally)**  
      - [Prerequisites](#prerequisites)  
      - [Installation](#installation)  
   5. **[Authentication](#-authentication)**  
      - [User Registration](#user-registration)  
      - [User Login](#user-login)  
   6. **[Blog Management](#-blog-management)**  
      - [Create Blog](#create-blog)  
      - [Update Blog](#update-blog)  
      - [Delete Blog](#delete-blog)  
   7. **[Admin Actions](#️-admin-actions)**  
      - [Block User](#block-user)  
      - [Delete Blog (Admin)](#delete-blog-admin)  
   8. **[Search, Sort & Filter Blogs](#-search-sort--filter-blogs)**  
   9. **[Error Handling](#-error-handling)**  
   10. **[Custom Progress Indicators](#-custom-progress-indicators)**
   11. **[Project Overview Video](#-project-overview-video)**  
   12. **[Admin Credentials](#-admin-credentials)**  

</details>

## 📚 Overview

Runtime Realm Server is a robust backend application built for managing blogs with user authentication, role-based access control, and comprehensive API functionalities. It supports both **Admin** and **User** roles with tailored permissions and features.

## 🚀 **Key Features of Runtime Realm Blogs Server**

1. **User Authentication & Authorization:** Secure login with role-based access control (Admin, User).  
2. **Role Management:** Admins can block users and manage all blogs, while users can manage their own content.  
3. **JWT-Based Security:** Access and refresh tokens ensure secure session management.  
4. **Middleware Protection:** Role-based access enforced through middleware (`auth`).  
5. **Blog Management:** Full CRUD operations for blogs, with ownership validation.  
6. **Search, Sort & Filter:**  Efficient querying powered by a reusable `QueryBuilder` class, designed to support future module expansions.  
7. **Password Encryption:** User passwords are securely hashed using **bcrypt**.  
8. **Data Validation:** Input validated with **Zod** schemas to ensure data integrity.  
9. **Scalable Architecture:** Modular and well-structured backend code for maintainability.  

## 🚀 Technologies (Packages) Used

### **🛠️ Core Technologies**

- **TypeScript** – Typed JavaScript for better scalability and maintainability.  
- **Node.js** – JavaScript runtime environment.  
- **Express.js** – Fast, unopinionated web framework for Node.js.  
- **Mongoose** – Elegant MongoDB object modeling for Node.js.

### **🔒 Authentication & Security**

- **bcrypt** – Library for hashing passwords.  
- **jsonwebtoken** – Implementation of JSON Web Tokens for authentication.  
- **cookie-parser** – Middleware to parse cookies in requests.

### **✅ Validation**

- **zod** – TypeScript-first schema validation library.

### **🌍 Cross-Origin Resource Sharing**

- **cors** – Middleware for enabling CORS in Express.

### **⚙️ Environment Configuration**

- **dotenv** – Loads environment variables from a `.env` file.

### **🛡️ Code Quality & Formatting**

- **eslint** – Linter for identifying problematic patterns in code.  
- **prettier** – Code formatter for consistent styling.

### **📦 Build & Development Utilities**

  
- **nodemon** – Utility for automatically restarting the server during development.  
- **ts-node-dev** – Run TypeScript directly without manual compilation.

## 🛠️ Run the Server Locally

### Prerequisites

- `Node.js` (Preferred `v22+`)
- `pnpm` package manager
- If you prefer `npm` or `yarn` over `pnpm`, delete `pnpm-lock.yaml` file and follow the steps below.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Md-Rashedul-Islam-Rajib/runtime-realm
   cd runtime-realm
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   for `npm`:

   ```bash
   npm install
   ```

   for `yarn`:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following fields:

   ```env
    NODE_ENV=development
    PORT=6969 or any port number
    SALT_ROUNDS=<number>
    DB_URL=your_mongo_db_uri
    JWT_ACCESS_SECRET=secret_string_for_access_token
    JWT_ACCESS_EXPIRES_IN=expiry_time (1h, 1d etc.)
    JWT_REFRESH_SECRET=secret_string_for_refresh_token
    JWT_REFRESH_EXPIRES_IN=expiry_time (1h, 1d etc.)
   ```

4. Start the development server:

   ```bash
    pnpm dev
   ```

   for `npm`:

   ```bash
    npm run dev
   ```

   for `yarn`:

   ```bash
    yarn run dev
   ```

5. Access the API at:

   ```bash
   http://localhost:6969
   ```

---

## 🔑 Authentication

### User Registration
- **Method:** POST 
- **Endpoint:** `/api/auth/register`
- **Description:** Register a new user.
- **Request Body:**

   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "123456"
   }
   ```

- **Response:**

   ```json
   {
     "success": true,
     "message": "User registered successfully!",
     "statusCode": 201,
     "data": {
       "_id": "string",
       "name": "string",
       "email": "string"
     }
   }
   ```

### User Login

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Description:** Authenticate a user and retrieve a JWT token.
- **Request Body:**

   ```json
   {
     "email": "john@example.com",
     "password": "123456"
   }
   ```

- **Response:**

   ```json
   {
     "success": true,
     "message": "Login successful!",
     "statusCode": 200,
     "data": {
       "token": "string"
     }
   }
   ```

---

## 📖 Blog Management

### Create Blog
- **Method:** POST
- **Endpoint:** `/api/blogs`
- **Description:** Create a new blog (User only).
- **Request Header:**

   ```bash
   Authorization: Bearer <token>
   ```

- **Request Body:**

   ```json
   {
     "title": "My First Blog",
     "content": "This is my blog content."
   }
   ```

- **Response:**

   ```json
   {
     "success": true,
     "message": "Blog created successfully!",
     "statusCode": 201,
     "data": {
       "_id": "string",
       "title": "My First Blog",
       "content": "This is my blog content.",
       "author": {
         "_id": "author id",
         "name": "author name",
         "email": "author email"
        }
      }
   }
   ```

### Update Blog

- **Method:** PATCH
- **Endpoint:** `/api/blogs/:id`
- **Description:** Update an existing blog (User only).
- **Request Header:**

   ```bash
   Authorization: Bearer <token>
   ```

- **Request Body:**

   ```json
   {
     "title": "Updated Blog Title",
     "content": "Updated content."
   }
   ```

- **Response**

   ```json
   {
   "success": true,
   "message": "Blog updated successfully",
   "statusCode": 200,
   "data": {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": {
        "_id": "author id",
        "name": "author name",
        "email": "author email"
       }
     }
   }
   ```

### Delete Blog

- **Method:** DELETE
- **Endpoint:** `/api/blogs/:id`
- **Description:** Delete a blog (User).
- **Request Header:**

   ```bash
   Authorization: Bearer <token>
   ```

- **Response**

   ```json
   {
    "success": true,
    "message": "Blog deleted successfully!",
    "statusCode": 200
   }
   ```

---

## ⚙️ Admin Actions

### Block User

- **Method:** PATCH
- **Endpoint:** `/api/admin/users/:userId/block`
- **Description:**  Allows an admin to block a user by updating the `isBlocked` property to `true`.
- **Request Header:**

   ```bash
   Authorization: Bearer <admin_token>
   ```

- **Response**

   ```json
   {
    "success": true,
    "message":"User blocked successfully!",
    "statusCode": 200
   }
   ```

### Delete Blog (Admin)

- **Method:** DELETE
- **Endpoint:** `/api/admin/blogs/:id`
- **Description:** Delete any blog.
- **Request Header:**

   ```bash
   Authorization: Bearer <admin_token>
   ```

- **Response**

   ```json
   {
    "success": true,
    "message": "Blog deleted successfully!",
    "statusCode": 200
   }
   ```

---

## 📊 Search, Sort & Filter Blogs

- **Method:** GET
- **Endpoint:** `/api/blogs`
- **Query Parameters:**
  - `search`: Search blogs by `title` or `content` (e.g., `search=productivity`).
  - `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
  - `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
  - `filter`: Filter blogs by author ID (e.g., `author=authorId`).

**Example Request URL**:

```sql
/api/blogs?search=productivity&sortBy=title&sortOrder=desc&filter=676652d0b7adefd7d645a727
```

In this example:

- `search=technology`: Filters blogs containing the term "technology" in the title or content.
- `sortBy=title`: Sorts the blogs by the `title` field.
- `sortOrder=desc`: Sorts in descending order (newest blogs first).
- `filter=676652d0b7adefd7d645a727`: Filters blogs authored by the user with the given `authorId`.

**Response:**

```json
{
  "success": true,
  "message": "Blogs fetched successfully!",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": {
        "_id": "author id",
        "name": "author name",
        "email": "author email"
      }
    },
    {...}
  ]
}
```

---

## 🐞 Error Handling

All error responses follow a consistent structure:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": [
         {
           "name": "Error name",
           "path": "where error occurred if traced",
           "message": "Error message"
         },
         {...}
      ]
   },
  "stack": "Error stack trace if available"
}
```

---



## 📹 Project Overview Video

- **[Project Demo Video Link](https://drive.google.com/file/d/1qFIqThgPi2Ul3DetJ-yyypVDpCRLHSGC/view?usp=sharing)**

---

## 🧠 Admin Credentials

- **Email:** `runtime-realm@gmail.com`
- **Password:** `runtime_realm`