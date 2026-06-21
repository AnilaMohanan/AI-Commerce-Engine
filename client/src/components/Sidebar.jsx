import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;