function Products() {
  return (
    <div>
      <h1>Products</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Winter Jacket</td>
            <td>2999</td>
            <td>50</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Shoes</td>
            <td>1999</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Products;