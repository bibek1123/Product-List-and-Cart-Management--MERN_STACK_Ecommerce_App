# Product-List-and-Cart-Management--MERN_STACK_Ecommerce_App

## Description
This project is a product list and cart management system built using **Node.js**, **React**, **React Context API**, and **MongoDB**. It includes a functional cart, user authentication, admin panel for product management, and responsive design.

---

## Features

### Admin Role
- Login using credentials.
- Add, edit, and delete product details (images, names, prices, etc.).
- Manage product data in the database.

### User Role
- Add/remove items to/from the cart.
- Increase/decrease the number of items in the cart, with updates reflected in the database.
- View order confirmation modal when clicking "Confirm Order."
- Reset selections with the "Start New Order" button.
- Perform all actions using only the keyboard (keyboard accessibility).
- View responsive layouts optimized for various screen sizes.

### Database
- MongoDB for storing:
  - Product data.
  - User data.
  - Cart and order information.

### Authentication
- JWT-based authentication to differentiate between admin and user roles.

---

## Tech Stack

### Frontend
- React
- React Context API

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd product-list-cart
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

4. Install dependencies for the frontend:
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables
Create a `.env` file in the backend directory with the following variables:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000
```

---

## Usage

### Running the Backend
1. Navigate to the `backend` directory:
   ```bash
   cd server
   ```
2. Start the server:
   ```bash
   npm start
   ```

### Running the Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd ../client
   ```
2. Start the React development server:
   ```bash
   npm start
   ```

The application will be accessible at `http://localhost:3000`.

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login user (admin or regular).
- `POST /api/v1/auth/register` - Register a user (admin or regular).

### Products
- `GET /api/v1/user/product/list` - Fetch all products.
- `POST /api/v1/admin/product/create` - Add a new product (Admin only).
- `PUT /api/v1/admin/product/updateById/:id` - Update product details (Admin only).
- `DELETE /api/v1/admin/product/deleteById/:id` - Delete a product (Admin only).

### Cart
- `POST /api/v1/cart` - Add item to the cart.
- `PUT /api/v1/cart/:id` - Update cart item quantity.
- `DELETE /api/v1/cart/:id` - Remove item from the cart.

### Orders
- `POST /api/v1/admin/orders/updateById/:id` - Confirm order.
- `DELETE /api/v1/admin/orders/deleteById/:id` - Reset order.

---

## Keyboard Accessibility
Ensure all interactive elements can be accessed and operated using only the keyboard:
- Use `Tab` to navigate between elements.
- Use `Enter` or `Space` to activate buttons or links.

---

## Responsive Design
- Designed to work seamlessly on various devices, including desktops, tablets, and smartphones.

---

## Future Enhancements
- Add profile management.
- Implement payment gateway integration.
