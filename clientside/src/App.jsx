import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/homepage";
import About from "./Pages/about";
import Policy from "./Pages/policy";
import Contact from "./Pages/contact";
import Pagenotfound from "./Pages/pagenotfound";
import Register from "./Pages/Auth/registration";
import Login from "./Pages/Auth/login";
import Dashboard from "./Pages/User/dashboard";
import Protected from "./Components/Routes/Protected";
import ForgetPassword from "./Pages/Auth/forgetPassword";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRoute from "./Components/Routes/Admin";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/User/profile";
import Orders from "./Pages/User/orders";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/search";
import ProductDetails from "./Pages/Admin/ProductDetails";
import Category from "./Pages/category";
import CategoryProduct from "./Pages/categoryProduct";
import CartPage from "./Pages/cartPage";
import AdminOrders from "./Pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
      
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Protected />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
