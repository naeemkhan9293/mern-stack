import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] = useState({name:"" ,email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      alert(json.message)
      navigate("/login");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login__Container">
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input type="name" placeholder="Enter Name" name="name" 
          onChange={onChange} value={credentials.name} required />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="email" placeholder="Enter Email" name="email"
          onChange={onChange} value={credentials.email} required />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange} value={credentials.password}
            required
          />

          <button type="submit" className="Login_btn">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
