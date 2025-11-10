import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Login successful!");
        localStorage.setItem("token", data.token); // optional if backend sends JWT
        navigate("/course-generator");
      } else {
        setStatus(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setStatus("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="cta-btn">Login</button>
        </form>

        {status && <p style={{ marginTop: "10px", color: "#eb8900" }}>{status}</p>}

        <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#333" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#eb8900", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
