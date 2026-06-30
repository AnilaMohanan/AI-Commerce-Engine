function Navbar() {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center mb-6">

      <h1 className="text-2xl font-bold">
        AI Commerce Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2"
        />

        <button className="text-2xl">
          🔔
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            S
          </div>

          <span className="font-medium">
            Suyash
          </span>
        </div>

      </div>

    </div>
  );
}

export default Navbar;