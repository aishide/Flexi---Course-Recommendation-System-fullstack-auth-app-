import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ user }) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      // user is logged in
      navigate("/course-generator");
    } else {
      // user is not logged in, go to register
      navigate("/register");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to <span>KnowPath AI</span></h1>
        <p>
          Discover personalized learning paths built just for you.  
          KnowPath AI recommends the right courses to match your goals,  
          skills, and interests — powered by intelligent AI insights.
        </p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
