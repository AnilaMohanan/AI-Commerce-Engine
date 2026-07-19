function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-10 shadow-lg">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to AI Commerce
      </h1>

      <p className="text-lg mb-6">
        Discover amazing products powered by AI search and smart recommendations.
      </p>

      <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
        Shop Now
      </button>
    </div>
  );
}

export default Hero;