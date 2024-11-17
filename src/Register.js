import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import baseUrl from "./utils/baseUrl"; 

export default function Register() {
  // State to hold name, email, and password
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = (e) => {
    // Prevent the form from refreshing the whole page
    e.preventDefault();
  
    // Set configuration for the API request
    const configuration = {
      method: "post",
      url: baseUrl + "signup", 
      data: {
        name,
        email,
        password,
      },
    };
  
    // Make the API call to register the user
    axios(configuration)
      .then((result) => {
        if (result.status === 201) {
          setRegister(true); 
          setError(""); 
        }
      })
      .catch((error) => {
  
        if (error.response && error.response.data && error.response.data.error.code === 11000) {
          setError("User already exists. Please use a different email.");
        } else {
          setError("Registration failed. Please try again.");
        }
  
        setRegister(false); 
      });
  };
  
  

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* Name */}
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email"
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Register
        </Button>

        {/* Success/Error Message */}
        {register ? (
          <p className="text-success">You are registered successfully!</p>
        ) : (
          error && <p className="text-danger">{error}</p>
        )}
      </Form>
    </>
  );
}
