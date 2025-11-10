import React from "react";
import "./CommonPages.css";

function About() {
  return (
    <div
      className="page-container"
      style={{ backgroundImage: "url('Background.png')" }}
    >
      <div className="content-box">
        <h1>About KnowPath AI</h1>
        <p>
          Welcome to <strong>KnowPath AI</strong> — your personalized course
          recommendation platform powered by Artificial Intelligence.
        </p>

        <h2>🎯 Our Mission</h2>
        <p>
          Our goal is to simplify the learning journey by helping learners find
          the most suitable courses based on their goals, skills, and interests.
        </p>

        <h2>💡 What We Do</h2>
        <ul>
          <li>Analyze your interests and experience level.</li>
          <li>Use intelligent algorithms to suggest curated courses.</li>
          <li>Save you hours of searching — learn smarter, not harder.</li>
        </ul>

        <h2>🤝 Why Choose KnowPath AI?</h2>
        <p>
          We combine data-driven insights and user preferences to provide a
          seamless, tailored learning experience that’s right for you.
        </p>
      </div>
    </div>
  );
}

export default About;
