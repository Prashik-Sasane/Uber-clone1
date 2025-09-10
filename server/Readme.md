# Developer Documentation: `/user/register` and `/user/login` Routes

---

## `/user/register` Route

### Overview

The `/user/register` endpoint allows new users to register by providing their first name, email, and password. The backend validates input, hashes the password, saves the user, and returns a JWT token.

### Route Details

- **Method:** POST  
- **Path:** `/user/register`  
- **Controller:** `usercontroller.registerUser`  
- **Middlewares:**  
  - `express-validator` for input validation

### Request Body

```json
{
  "fullname": {
    "firstname": "John"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Validation Rules

- `fullname.firstname`: Required, string, minimum 3 characters.
- `email`: Required, must be a valid email format.
- `password`: Required, minimum 6 characters.

### Backend Flow

1. **Validation:** Uses `express-validator` to check the request body. If validation fails, responds with status `400` and error details.
2. **Password Hashing:** The password is hashed using bcrypt before saving.
3. **User Creation:** A new user document is created in MongoDB with the provided details.
4. **Token Generation:** After successful registration, a JWT token is generated using the user's `_id`.
5. **Response:** Returns a JSON object with the JWT token and user data.

### Example Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "1234567890abcdef",
    "fullname": {
      "firstname": "John"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses

- **400 Bad Request:**  
  - Validation errors (missing fields, invalid email, short password)
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

---

## `/user/login` Route

### Overview

The `/user/login` endpoint allows existing users to authenticate using their email and password. The backend validates input, checks credentials, and returns a JWT token with user data upon successful login.

### Route Details

- **Method:** POST  
- **Path:** `/user/login`  
- **Controller:** `usercontroller.loginUser`  
- **Middlewares:**  
  - `express-validator` for input validation

### Request Body

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Validation Rules

- `email`: Required, must be a valid email format.
- `password`: Required, minimum 6 characters.

### Backend Flow

1. **Validation:** Uses `express-validator` to check the request body. If validation fails, responds with status `400` and error details.
2. **User Lookup:** Finds the user by email in MongoDB. If not found, responds with status `401`.
3. **Password Verification:** Compares the provided password with the hashed password in the database using bcrypt.
4. **Token Generation:** If credentials are valid, generates a JWT token using the user's `_id`.
5. **Response:** Returns a JSON object with the JWT token and user data.

### Example Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "1234567890abcdef",
    "fullname": {
      "firstname": "John"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses

- **400 Bad Request:**  
  - Validation errors (missing fields, invalid email, short password)
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
- **401 Unauthorized:**  
  - Invalid email or password
  - Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

## `/user/profile` Route

### Overview

The `/user/profile` endpoint allows an authenticated user to fetch their profile information.

### Route Details

- **Method:** GET  
- **Path:** `/user/profile`  
- **Controller:** `usercontroller.getProfile`  
- **Middlewares:**  
  - `authMiddleware.authUser` for JWT authentication

### Request

- **Headers:**  
  - `Authorization: Bearer <jwt_token>`

### Backend Flow

1. **Authentication:** Uses JWT middleware to verify the user's token.
2. **User Lookup:** Fetches the user by ID from the token.
3. **Response:** Returns user data (excluding password).

### Example Success Response

```json
{
  "user": {
    "_id": "1234567890abcdef",
    "fullname": {
      "firstname": "John"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses

- **404 Not Found:**  
  - User not found
  - Example:
    ```json
    {
      "message": "User not found"
    }
    ```
- **401 Unauthorized:**  
  - Missing or invalid token

---

## `/user/logout` Route

### Overview

The `/user/logout` endpoint logs out the authenticated user by blacklisting their JWT token.

### Route Details

- **Method:** GET  
- **Path:** `/user/logout`  
- **Controller:** `usercontroller.logoutUser`  
- **Middlewares:**  
  - `authMiddleware.authUser` for JWT authentication

### Request

- **Headers:**  
  - `Authorization: Bearer <jwt_token>`

### Backend Flow

1. **Authentication:** Uses JWT middleware to verify the user's token.
2. **Token Blacklisting:** Adds the token to a blacklist to prevent further use.
3. **Response:** Clears the token cookie and confirms logout.

### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

- **401 Unauthorized:**  
  - Missing or invalid token

---

## Related Files

- `server/routes/user.routes.js` — Route definition and validation
- `server/controller/usercontroller.js` — Controller logic
- `server/models/user.js` — User schema and methods
- `server/services/user.service.js` — User service functions