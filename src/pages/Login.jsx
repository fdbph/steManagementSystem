// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";
import "../styles/auth.css";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ identifier, password });
      if (res.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError("Server or network error");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" alt="App Logo" className="auth-logo" />
      <h1>Calatrava National High School</h1>
      <h2>STE Management System</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="DepEd Email or Learner Resource Number(LRN)"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
