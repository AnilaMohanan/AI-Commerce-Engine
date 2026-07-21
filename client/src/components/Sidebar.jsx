import { NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        🛒 AI Commerce
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          📦 Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          📂 Categories
        </NavLink>

        <NavLink
          to="/admin/add-product"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          ➕ Add Product
        </NavLink>
<NavLink
    to="/admin/orders"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
>
    <ShoppingBag size={20}/>
    Orders
</NavLink>
        <NavLink
          to="/admin/ai-search"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          🤖 AI Search
        </NavLink>

        <hr className="my-4 border-slate-700" />

        <NavLink
          to="/"
          className="p-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
        >
          🛍️ Customer Store
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;