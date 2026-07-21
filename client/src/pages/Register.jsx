import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(
        response.data.message ||
          "Registration Successful!"
      );

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600 text-white relative overflow-hidden">

        <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 rounded-full bg-white/10 bottom-0 -right-24"></div>

        <div className="flex flex-col justify-center px-20 z-10">

          <h1 className="text-6xl font-extrabold mb-6">
            AI Commerce
          </h1>

          <p className="text-xl text-blue-100 leading-9">
            Create your account and experience intelligent online shopping powered by AI.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3 text-2xl">
                👤
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Quick Registration
                </h3>

                <p className="text-blue-100">
                  Create your account in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3 text-2xl">
                🛒
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Personalized Shopping
                </h3>

                <p className="text-blue-100">
                  AI recommends products based on your interests.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3 text-2xl">
                🔒
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Secure Account
                </h3>

                <p className="text-blue-100">
                  Your information is protected with secure authentication.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-100 to-indigo-100 p-6">

        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">
              🚀
            </div>

            <h2 className="text-4xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join AI Commerce today.
            </p>

          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>

              <label className="font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 rounded-xl transition duration-300"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-indigo-700 font-bold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;