function ProductTable() {
  const products = [
    {
      id: 1,
      name: "Winter Jacket",
      category: "Clothing",
      price: "₹2999",
      stock: 50,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Footwear",
      price: "₹1999",
      stock: 30,
      status: "In Stock",
    },
    {
      id: 3,
      name: "T-Shirt",
      category: "Clothing",
      price: "₹799",
      stock: 0,
      status: "Out of Stock",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Products</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-3">{product.id}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.price}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;