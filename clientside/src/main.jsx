// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/auth.jsx";
import "antd/dist/reset.css";
import { SearchProvider } from "./Context/search.jsx";
import { CartProvider } from "./Context/cart.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
