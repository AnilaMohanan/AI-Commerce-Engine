function AddProduct() {
  return (
    <div>
      <h1>Add Product</h1>

      <form>
        <input type="text" placeholder="Product Name" />
        <br />
        <br />

        <input type="number" placeholder="Price" />
        <br />
        <br />

        <input type="number" placeholder="Stock" />
        <br />
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;