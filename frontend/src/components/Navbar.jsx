import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local user state and any stored auth tokens
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src="/KnowPath AI.png"
            alt="KnowPath AI Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>

          {user ? (
            <>
              <li><Link to="/course-generator">Courses</Link></li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
