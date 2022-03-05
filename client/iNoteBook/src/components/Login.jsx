import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json()
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
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
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            required
            />

          <label htmlFor="Password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            required
          />

          <button type="submit" className="Login_btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
