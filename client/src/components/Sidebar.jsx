import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        🛒 AI Commerce
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/"
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
          to="/products"
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
          to="/add-product"
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

      </nav>
    </div>
  );
}

export default Sidebar;