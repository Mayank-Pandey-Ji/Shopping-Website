# 🛍️ Shopping Website

A fully functional e-commerce frontend built using **React.js** and the [Fake Store API](https://fakestoreapi.com/docs). showcasing routing, authentication, state management, and responsive UI.

---

## 🚀 Features

### 🔐 Authentication
- Login page with username & password
- Authenticated via Fake Store API `/auth/login`
- JWT token stored in `localStorage`
- Redirects to product listing page on success

### 🏠 Product Listing Page
- Fetches products from `/products`
- Filter products by category via `/products/category/:category`
- Search bar for product titles
- Responsive grid layout using **mobile-first CSS**

### 📦 Product Detail Page
- Displays product image, title, price, and description
- "Add to Cart" button to add item to cart

### 🛒 Cart Page
- View added products with quantity and price
- Update quantity or remove items
- Displays total price
- "Checkout" button:
  - Clears the cart
  - Shows a confirmation popup for 4 seconds

### 🔗 Header / Navigation
- Navigation links: `Home`, `Cart`, `Logout`
- Dynamic cart item count
- Logout clears token and redirects to login page

---

## 🧑‍💻 Tech Stack

- ⚛️ **React.js** (Vite)
- 🧭 **React Router v6**
- ⚓ **React Hooks**
- 📦 **Context API** (for managing cart state)
- 🎨 **Plain CSS** (Responsive, mobile-first)
- 🔐 **Fake Store API**



## 🛠️ Getting Started

### 📦 Installation

```bash
git clone https://github.com/your-username/shopping-app.git
cd shopping-app
npm install
npm run dev
```

## folder structure
```
src/
├── components/        // Reusable components (Header, ProductCard, etc.)
├── pages/             // Page-level components (Login, Home, Cart, etc.)
├── context/           // Cart context for global state management
├── styles/            // Plain CSS files
├── App.jsx
└── main.jsx
```

📚 API Reference
All data is powered by the Fake Store API.

