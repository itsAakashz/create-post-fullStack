
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Await, Navigate, useNavigate } from "react-router-dom";

const Update = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("")
    const { id } = useParams();
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


//getting single user data
async function getSingleUser() {
    try {
        
        const response = await fetch(`https://create-post-full-stack.vercel.app/${id}`)
        const result = await response.json();
        if (!response.ok) {
            setError(result.error);
        } else {
            console.log(result)
            setError('');
            setName(result.name)
            setEmail(result.email)
            setAge(result.age)
        }
    } catch (error) {
        console.error('Error fetching data:', error);               
        setError('Error fetching data');
    }
 }

 //Send updated/edit data to backend/server
 const handleEdit = async (e) => {
    e.preventDefault();
    const userUpdate = { name, email, age };
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userUpdate),
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


 useEffect(() => {
    getSingleUser();
}, []);


  return (
    <div className="container my-2">
      <h2 className="text-center">Edit Post</h2>
      <form onSubmit={handleEdit}>
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
          Update
        </button>
        </div>
        
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  )
}
export default Update;
