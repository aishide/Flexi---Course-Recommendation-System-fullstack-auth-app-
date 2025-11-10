import React from "react";
import "./CommonPages.css";

function FAQ() {
  return (
    <div
      className="page-container"
      style={{ backgroundImage: "url('Background.png')" }}
    >
      <div className="content-box">
        <h1>FAQs</h1>

        <h2>1. What is KnowPath AI?</h2>
        <p>
          KnowPath AI is an AI-driven platform that recommends courses tailored
          to your goals and learning style.
        </p>

        <h2>2. How does it work?</h2>
        <p>
          You answer a few quick questions, and our algorithm instantly suggests
          the most relevant courses for you.
        </p>

        <h2>3. Is KnowPath AI free?</h2>
        <p>
          Yes! You can explore and generate personalized course suggestions for
          free.
        </p>

        <h2>4. Can I save my generated results?</h2>
        <p>
          We’re working on adding this feature soon — stay tuned for updates!
        </p>

        <h2>5. Who can use KnowPath AI?</h2>
        <p>
          Anyone — from students exploring new topics to professionals upskilling
          for their careers.
        </p>
      </div>
    </div>
  );
}

export default FAQ;
