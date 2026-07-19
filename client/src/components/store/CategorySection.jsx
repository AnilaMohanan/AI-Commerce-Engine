function CategorySection() {
  const categories = [
    "Mobiles",
    "Electronics",
    "Laptops",
    "Books",
    "Clothing",
  ];

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6">
        Shop by Category
      </h2>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;