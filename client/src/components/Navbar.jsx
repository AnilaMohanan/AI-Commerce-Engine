import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center mb-6">

      <h1 className="text-2xl font-bold">
        AI Commerce Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <button className="text-2xl">
          🔔
        </button>

        <div className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <span className="font-medium">
            {user?.name || "User"}
          </span>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;