ER-MART:
This is an e-commerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform includes a range of features to simulate an online shopping experience, such as product listings, a shopping cart, user authentication, and a user profile section (currently under development).

Features:
(i)Product Listings: View a variety of products with images, descriptions, and prices.
(ii)Shopping Cart: Add, update, or remove products from your cart.
(iii)User Authentication: Secure login and registration for users.
(iv)User Profile: Manage personal details and view order history (currently under development).
(v)Responsive Design: The platform is mobile-friendly and works well on all screen sizes.

Technologies Used:
(i) Frontend: React, Context API(for state management), CSS, Bootstrap
(ii)Backend: Node.js, Express.js
(iii)Database: MongoDB
(iv)Authentication: JWT (JSON Web Token), bcrypt.js
(v)Other Tools: Axios (for API calls), React Router

Project Structure: 

ecommerce-project/
│
├── backend/               # Backend folder
│   ├── models/            # MongoDB models
│   ├── routes/            # Express routes
│   ├── controllers/       # Controller logic
│   ├── config/            # Config files
│   ├── .env               # Environment variables
│   └── server.js          # Entry point for the backend
│
├── frontend/              # Frontend folder
│   ├── src/               # React components, services, and pages
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
│
└── README.md              # Project documentation

How To Use:
1. Register an account: You can sign up by creating a new account through the registration form.
2. Browse products: View product listings and select the items you want to add to your shopping cart.
3. Manage your cart: Add or remove products from the cart.
4. Checkout: Complete the checkout process by providing necessary details.
5. User Profile: View and edit your profile and order history.
