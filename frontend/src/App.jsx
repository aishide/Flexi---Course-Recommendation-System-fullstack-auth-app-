import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseGenerator from "./pages/CourseGenerator";

// newly added pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

function App() {
  const [user, setUser] = useState(() => {
    // Try to load user info from localStorage on app start
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Keep user logged in across refreshes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Optional: Auto-check backend token validity (for later)
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       try {
  //         const res = await fetch("http://localhost:5000/api/auth/me", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const data = await res.json();
  //         if (res.ok) setUser(data);
  //         else setUser(null);
  //       } catch {
  //         setUser(null);
  //       }
  //     }
  //   };
  //   checkAuth();
  // }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/course-generator" element={<CourseGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
