import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../api/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    try {
      setLoading(true);

      const response = await checkout(user._id);

      alert(response.message);

      navigate("/orders");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Checkout failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Shipping Address */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Shipping Address
          </h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Payment Method</span>
              <span>Cash on Delivery</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Calculated during checkout</span>
            </div>

          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;