function Products() {
  const products = [
    {
      id: 1,
      image: "🧥",
      name: "Winter Jacket",
      category: "Clothing",
      price: "₹2999",
      stock: 50,
    },
    {
      id: 2,
      image: "👟",
      name: "Running Shoes",
      category: "Footwear",
      price: "₹1999",
      stock: 30,
    },
    {
      id: 3,
      image: "👕",
      name: "T-Shirt",
      category: "Clothing",
      price: "₹799",
      stock: 0,
    },
  ];

  return (
    <div>
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <input
          type="text"
          placeholder="🔍 Search Product..."
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3 text-3xl">{product.image}</td>

                <td className="p-3 font-medium">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.category}
                </td>

                <td className="p-3">
                  {product.price}
                </td>

                <td className="p-3">
                  {product.stock}
                </td>

                <td className="p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Products;