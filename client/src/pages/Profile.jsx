import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../api/userApi";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(user._id);

      setProfile({
        name: response.user.name,
        email: response.user.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile(
        user._id,
        profile
      );

      alert(response.message);

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      fetchProfile();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="flex flex-col items-center mb-8">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>

        </div>

        <label className="block mb-2 font-medium">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-5"
        />

        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-8"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Profile;