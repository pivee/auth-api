# Auth API

Auth backend starter using NestJS and Prisma.

- Swagger UI: `{{baseUrl}}/api/docs`
  - Local: http://localhost:3000/api/docs

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd auth-api
   ```

2. **Create the `.env` file:**

   ```bash
    NODE_ENV="development"
    DATABASE_URL="mongodb+srv://username:password@hostname/database?options="
    CORS_ORIGINS="allowed_origins_as_comma_separated_values"
    JWT_ACCESS_TOKEN_SECRET="access_key_secret"
    JWT_ACCESS_TOKEN_EXPIRY="300s"
   ```

3. **Install the dependencies:**

    ```bash
    pnpm install
    ```

4. **Run the server:**

    ```bash
    pnpm start
    ```

### Description

This NestJS project is for demoing a simple authentication server where the users can sign up using an email address and password with the following constraints.

- Password requirements:
  - Minimum length of 8 characters.
  - Contains at least 1 letter.
  - Contains at least 1 number.
  - Contains at least 1 special character.

After successful account creation, users can sign in using their credentials to receive their access token as a cookie.

### Sign up and Sign in

```mermaid
sequenceDiagram
    participant Client
    participant NestJS_Server
    participant Database

    Client ->> NestJS_Server: POST /sign-up { email, password }
    Note over NestJS_Server: Validate password requirements
    NestJS_Server ->> Database: Check if email exists
    Database -->> NestJS_Server: Email availability
    Note over NestJS_Server: If email exists, return error
    NestJS_Server ->> NestJS_Server: Hash password
    NestJS_Server ->> Database: Save new user { email, hashedPassword }
    Database -->> NestJS_Server: Confirmation of user creation

    Client ->> NestJS_Server: POST /sign-in { email, password }
    Note over NestJS_Server: Validate credentials
    NestJS_Server ->> Database: Retrieve user by email
    Database -->> NestJS_Server: User data
    Note over NestJS_Server: Compare hashed passwords
    NestJS_Server -->> Client: Set JWT as HTTP-only cookie
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant NestJS_Server
    participant Auth_Service
    participant Database

    Client ->> NestJS_Server: POST /auth
    Note over NestJS_Server: Cookie attached with JWT
    NestJS_Server ->> Auth_Service: Validate JWT
    Auth_Service -->> NestJS_Server: Validation result (valid/invalid)
    Note over NestJS_Server: If valid, return 200
    NestJS_Server -->> Client: 200: OK
    Note over NestJS_Server: If invalid, return 403
    NestJS_Server -->> Client: 403: Forbidden

```