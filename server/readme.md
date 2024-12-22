# Node.js E-Commerce API

This is a RESTful API for an e-commerce application built using **Node.js** and **Express.js**. The API provides user authentication, product management (admin only), and shopping cart functionality with **JWT-based** authentication. The application uses **MongoDB** as the database.

## Features

- **User Authentication**:
  - Register a new user
  - Login and get a JWT token
  - Secure endpoints with JWT authentication

- **Product Management** (Admin Only):
  - Retrieve all products
  - Retrieve a single product by ID
  - Add new products
  - Update existing products
  - Delete products

- **Shopping Cart**:
  - Retrieve a user's shopping cart
  - Add items to the cart
  - Remove items from the cart

## Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (You can use MongoDB Atlas or a local MongoDB instance)
- **Postman or any API testing tool** for testing endpoints

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/e-commerce-api.git
   cd e-commerce-api
   ```

2. **Install dependencies**:

   Ensure you have **Node.js** installed. Then, run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   
   Copy the contents of the `.env.example` file to `.env` and fill in the necessary values, especially for the MongoDB URI and JWT secret.

   Example `.env` file:

   ```plaintext
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=5000
   ```

4. **Start the server**:

   To run the server locally, use the following command:

   ```bash
   npm start
   ```

   The server will run on **http://localhost:5000** by default. If you want to use a different port, update the `PORT` variable in your `.env` file.

## API Endpoints

### User Authentication

- **POST** `/api/auth/register`:
  - Register a new user.
  - **Request body**: `{ "username": "user1", "email": "user1@example.com", "password": "password123" }`
  - **Response**: `{ "message": "User created successfully", "user": {...} }`

- **POST** `/api/auth/login`:
  - Login a user and get a JWT token.
  - **Request body**: `{ "email": "user1@example.com", "password": "password123" }`
  - **Response**: `{ "token": "JWT_TOKEN" }`

### Product Management (Admin Only)

- **GET** `/api/products`:
  - Retrieve a list of products.
  - **Response**: `[ { "id": 1, "name": "Product 1", "price": 100, ... } ]`

- **GET** `/api/products/:id`:
  - Retrieve details of a specific product.
  - **Response**: `{ "id": 1, "name": "Product 1", "price": 100, ... }`

- **POST** `/api/products` (Admin Only):
  - Add a new product.
  - **Request body**: `{ "name": "New Product", "description": "Product description", "price": 150, "stock": 50 }`
  - **Response**: `{ "id": 2, "name": "New Product", "price": 150, ... }`

- **PUT** `/api/products/:id` (Admin Only):
  - Update an existing product.
  - **Request body**: `{ "price": 120, "stock": 45 }`
  - **Response**: `{ "id": 1, "name": "Product 1", "price": 120, ... }`

- **DELETE** `/api/products/:id` (Admin Only):
  - Delete a product.
  - **Response**: `{ "message": "Product deleted successfully" }`

### Shopping Cart

- **GET** `/api/cart` (Authenticated User):
  - Retrieve the user's shopping cart.
  - **Response**: `{ "items": [ { "product": { ... }, "quantity": 2 } ] }`

- **POST** `/api/cart` (Authenticated User):
  - Add an item to the cart.
  - **Request body**: `{ "productId": "product_id", "quantity": 2 }`
  - **Response**: `{ "message": "Item added to cart" }`

- **DELETE** `/api/cart/:id` (Authenticated User):
  - Remove an item from the cart.
  - **Response**: `{ "message": "Item removed from cart" }`

## Middleware and Authentication

- **JWT Authentication**: 
  - A valid JWT token must be included in the `Authorization` header for accessing protected routes.
  - The JWT token is returned on successful login and should be included in the `Authorization` header as `Bearer <token>` for all requests requiring authentication.

- **Admin Authentication**:
  - Certain routes, like product creation, updating, and deletion, are restricted to users with an `admin` role. These routes can be accessed only by admins who have a valid JWT token.

## Testing with Postman

1. **Register**:
   - Send a `POST` request to `/api/auth/register` with the user details in the body.

2. **Login**:
   - Send a `POST` request to `/api/auth/login` with the registered user's email and password.
   - Save the JWT token from the response.

3. **Access Admin Routes** (e.g., adding a product):
   - Send a `POST` request to `/api/products` with a valid JWT token in the `Authorization` header.
   - Example: `Authorization: Bearer <JWT_TOKEN>`

4. **Access Cart Routes** (e.g., adding an item):
   - Send a `POST` request to `/api/cart` with a valid JWT token in the `Authorization` header.

## Folder Structure

```
/config
    /db.js          # Database connection logic
/controllers
    /authController.js
    /productController.js
    /cartController.js
/services
    /authService.js
    /productService.js
    /cartService.js
/routes
    /auth.js
    /product.js
    /cart.js
/middleware
    /auth.js
/models
    /user.js
    /product.js
    /cart.js
/.env                # Environment variables file
/server.js           # Entry point for the application
```

## License

This project is open-source and available under the [MIT License](LICENSE).

---

### Final Notes:

- The application uses **MongoDB** for data storage, **JWT** for authentication, and **Node.js** with **Express.js** for building the API.
- Make sure to keep your `.env` file secure and never expose it in public repositories.
