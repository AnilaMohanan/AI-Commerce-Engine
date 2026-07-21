import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 text-white relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full bottom-0 -right-32"></div>

        <div className="flex flex-col justify-center px-20 z-10">

          <h1 className="text-6xl font-extrabold mb-6">
            AI Commerce
          </h1>

          <p className="text-xl leading-9 text-blue-100">
            Smarter shopping powered by Artificial Intelligence.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                🛍️
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Smart Shopping
                </h3>

                <p className="text-blue-100">
                  Personalized recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                🤖
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  AI Search
                </h3>

                <p className="text-blue-100">
                  Find products instantly using AI.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                ⚡
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Fast Checkout
                </h3>

                <p className="text-blue-100">
                  Secure and quick ordering.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">

        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">
              🛒
            </div>

            <h2 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue shopping.
            </p>

          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>

              <label className="font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <div className="flex justify-between text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition duration-300"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-700 font-bold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;