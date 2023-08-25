# # ShopWithUs eCommerce Platform

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration

### Env Variables

Rename the `.env.example` file to `.env` and add the following

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

npm install
cd frontend
npm install

### Run

# Run frontend (:3000) & backend (:8000)

npm run dev

# Run backend only

npm run server

# Import data

npm run data:import

# Destroy data

npm run data:destroy

Sample User Logins

admin@email.com (Admin)
123456

babita@email.com (Customer)
123456

neha@email.com (Customer)
123456

#
