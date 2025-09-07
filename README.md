# Developer Documentation: `/user/register` Route

## Overview

The `/user/register` endpoint allows new users to register by providing their first name, email, and password. This route performs input validation, hashes the password, saves the user to the database, and returns an authentication token.

---

## Route Details

- **Method:** POST  
- **Path:** `/user/register`  
- **Controller:** `usercontroller.registerUser`  
- **Middlewares:**  
  - `express-validator` for input validation

---

## Request Body

```json
{
  "fullname": {
    "firstname": "John"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Validation Rules

- `fullname.firstname`: Required, string, minimum 3 characters.
- `email`: Required, must be a valid email format.
- `password`: Required, minimum 6 characters.

---

## Backend Flow

1. **Validation:**  
   Uses `express-validator` to check the request body. If validation fails, responds with status `400` and error details.

2. **Password Hashing:**  
   The password is hashed using bcrypt before saving.

3. **User Creation:**  
   A new user document is created in MongoDB with the provided details.

4. **Token Generation:**  
   After successful registration, a JWT token is generated using the user's `_id`.

5. **Response:**  
   Returns a JSON object with the JWT token and user data.

---

## Example Success Response

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

---

## Error Responses

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

## Related Files

- `server/routes/user.routes.js` — Route definition and validation
- `server/controller/usercontroller.js` — Controller logic
- `server/models/user.js` — User schema and methods
- `server/services/user.service.js` —