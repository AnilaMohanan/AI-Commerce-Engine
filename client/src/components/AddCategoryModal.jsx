import { useState } from "react";
import axios from "axios";

function AddCategoryModal({
    show,
    onClose,
    onCategoryAdded,
}) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);

    if (!show) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:5000/api/categories",

                formData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            alert("Category Added Successfully");

            setFormData({
                name: "",
                description: "",
                image: "",
            });

            onCategoryAdded();

            onClose();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to create category."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[500px] p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Add Category
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>

                    <div>

                       

                    </div>

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            {loading
                                ? "Saving..."
                                : "Add Category"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddCategoryModal;