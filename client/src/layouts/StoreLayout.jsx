import { Outlet, Link } from "react-router-dom";

function StoreLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">
            🛒 AI Commerce
          </h1>

          <div className="flex gap-6">
            <Link
              to="/"
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="hover:text-blue-600"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="hover:text-blue-600"
            >
              Wishlist
            </Link>

            <Link
              to="/orders"
              className="hover:text-blue-600"
            >
              Orders
            </Link>

            <Link
              to="/profile"
              className="hover:text-blue-600"
            >
              Profile
            </Link>

            <Link
              to="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <main className="max-w-7xl mx-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default StoreLayout;