import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Hello, {user.name} 👋</h1>
          <p>Role: <strong>{user.role}</strong></p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-main">
        {user.role === "admin" ? (
          <section className="dashboard-section">
            <h2>Admin Controls</h2>
            <ul>
              <li>📋 View all learners</li>
              <li>📁 Upload learning materials</li>
              <li>📊 View progress reports</li>
            </ul>
          </section>
        ) : (
          <section className="dashboard-section">
            <h2>Your Learning Materials</h2>
            <ul>
              <li>✅ Module 1: Introduction</li>
              <li>📘 Module 2: Resources</li>
              <li>🎯 Module 3: Quizzes</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
