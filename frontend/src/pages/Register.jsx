import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("Registering...");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Registration successful! Please log in.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setStatus(`❌ ${data.message || "Registration failed."}`);
      }
    } catch (err) {
      console.error("Register error:", err);
      setStatus("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="cta-btn">Register</button>
        </form>

        {status && (
          <p style={{ marginTop: "10px", color: "#eb8900" }}>
            {status}
          </p>
        )}

        <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#333" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#eb8900", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
