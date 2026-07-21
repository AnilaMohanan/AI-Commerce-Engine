import { useEffect, useState } from "react";
import axios from "axios";

function EditCategoryModal({
  show,
  onClose,
  category,
  onCategoryUpdated,
}) {
  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);

      setDescription(category.description);
    }
  }, [category]);

  if (!show) return null;

  const updateCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/categories/${category._id}`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Category Updated");

      onClose();

      onCategoryUpdated();

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl w-[450px] p-6">

        <h2 className="text-2xl font-bold mb-5">

          Edit Category

        </h2>

        <input
          className="border rounded-lg w-full p-3 mb-4"
          placeholder="Category Name"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
        />

        <textarea
          rows="4"
          className="border rounded-lg w-full p-3"
          placeholder="Description"
          value={description}
          onChange={(e)=>
            setDescription(e.target.value)
          }
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={updateCategory}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditCategoryModal;