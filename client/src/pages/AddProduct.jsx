function AddProduct() {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6">
        Add New Product
      </h1>

      <form className="space-y-5">

        <div>
          <label className="block font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Category
          </label>

          <input
            type="text"
            placeholder="Enter category"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="block font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              placeholder="Enter price"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Stock
            </label>

            <input
              type="number"
              placeholder="Enter stock"
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Enter product description"
            className="w-full border rounded-lg p-3"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Product Image URL
          </label>

          <input
            type="text"
            placeholder="Paste image URL"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;