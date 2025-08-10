# Uber-clone1

# API Documentation

## POST `/user/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```
### Response

A successful registration returns a JSON response like:

```json
{
    "message": "User registered successfully",
    "userId": "1234567890abcdef"
}
```