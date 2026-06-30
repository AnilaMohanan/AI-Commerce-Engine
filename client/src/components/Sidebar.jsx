import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        🛒 AI Commerce
      </h1>

      <nav className="space-y-4">

        <Link
          to="/"
          className="block p-3 rounded-lg hover:bg-slate-700 transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/products"
          className="block p-3 rounded-lg hover:bg-slate-700 transition"
        >
          📦 Products
        </Link>

        <Link
          to="/add-product"
          className="block p-3 rounded-lg hover:bg-slate-700 transition"
        >
          ➕ Add Product
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;