import { useState } from "react";
import API from "../services/api.js";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/users", formData);

      alert(response.data.message);

      console.log(response.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      });

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Registration Failed");

    }

  };

  return (

    <div
      style={{
        width: "400px",
        margin: "50px auto",
        border: "1px solid gray",
        padding: "20px",
        borderRadius: "10px"
      }}
    >

      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">

          Register

        </button>

      </form>

    </div>

  );

}

export default Register;