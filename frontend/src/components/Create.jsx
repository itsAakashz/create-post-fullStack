import React, { useState } from "react";
import { Await, Navigate, useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEntered = { name, email, age };
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(userEntered),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error); // Log the error message
      setError(result.error); // Set the error message in state
    } else {
      console.log(result); // Log the successful response
      setError(""); // Clear the error message in state
      setName("");
      setEmail("");
      setAge("");
      navigate("/all")
    }
  };

  
  return (
    <div className="container my-2">
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter age"
            id="age"
          />
        </div>
        <div className="text-center mt-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
        
        {error && <div class="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default Create;
