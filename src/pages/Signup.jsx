// src/pages/Signup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";
import "../styles/auth.css";

export default function Signup() {
  const [role, setRole] = useState("learner");
  const [formData, setFormData] = useState({
    learner_id: "",
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      learner_id: "",
      email: "",
      name: "",
      password: "",
    });
  }, [role]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let data = { role, name: formData.name, password: formData.password };

    if (role === "learner") {
      if (!formData.learner_id) {
        setError("Learner ID is required");
        return;
      }
      data.learner_id = formData.learner_id;
    } else {
      if (!formData.email) {
        setError("Email is required for admin/teacher");
        return;
      }
      data.email = formData.email;
    }

    try {
      const res = await register(data);
      if (res.status === "success") {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(res.message || "Signup failed");
      }
    } catch (err) {
      setError("Server or network error");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" alt="App Logo" className="auth-logo" />
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Select Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="learner">Learner</option>
            <option value="admin">Admin / Teacher</option>
          </select>
        </label>

        {role === "learner" && (
          <input
            type="text"
            name="learner_id"
            placeholder="Learner ID"
            value={formData.learner_id}
            onChange={handleChange}
            required
          />
        )}

        {role === "admin" && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
