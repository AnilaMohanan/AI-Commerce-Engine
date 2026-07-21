import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import StoreLayout from "./layouts/StoreLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AISearch from "./pages/AISearch";
import Login from "./pages/Login";
import Invoice from "./pages/Invoice";
import Register from "./pages/Register";
import AdminViewOrders from "./pages/AdminViewOrders";

// Store Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/edit-product/:id"
            element={<EditProduct />}
          />
          <Route path="/orders" element={<AdminViewOrders />} />

          <Route path="/ai-search" element={<AISearch />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const token = localStorage.getItem("token");
const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
  return (
    <BrowserRouter>
      <Routes>
 {/* Authentication */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

        {/* ---------------- CUSTOMER STORE ---------------- */}

        <Route path="/" element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
         <Route path="checkout" element={<Checkout />} />
<Route path="orders" element={<Orders />} />
<Route path="invoice/:orderId" element={<Invoice />} />
<Route path="profile" element={<Profile />} />
        </Route>

        {/* ---------------- ADMIN ---------------- */}

        <Route
          path="/admin/*"
          element={
             token && user.isAdmin ? (
              <DashboardLayout />
            ) : (
              <Login />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;