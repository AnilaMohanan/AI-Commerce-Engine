import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  addReview,
  getReviews,
} from "../api/reviewApi";

function ProductDetails() {
  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews(id);

      setReviews(response.reviews || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReview = async () => {
    try {
      await addReview({
        userId: user._id,
        productId: id,
        rating,
        comment,
      });

      alert("Review added successfully!");

      setComment("");
      setRating(5);

      fetchReviews();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add review."
      );
    }
  };

  if (!product) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Product */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-10">

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="text-gray-600 mt-5">
              {product.description}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-8">
              ₹{product.price}
            </h2>

          </div>

        </div>

      </div>

      {/* Review Form */}

      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold mb-5">
          Write a Review
        </h2>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="border rounded-lg p-3 mb-5 w-full"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <textarea
          rows="4"
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Write your review..."
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleReview}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Submit Review
        </button>

      </div>

      {/* Reviews */}

      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews
        </h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border-b py-5"
            >
              <h3 className="font-bold">
                {review.user?.name || "User"}
              </h3>

              <p className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="mt-2">
                {review.comment}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default ProductDetails;