import React, { useState } from "react";
import "./CommonPages.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(`❌ Failed: ${data.message || "Please try again."}`);
      }
    } catch (err) {
      console.error("Error sending contact form:", err);
      setStatus("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h1>Contact Us</h1>
        <p>
          Have questions or suggestions? Reach out to <strong>KnowPath AI</strong> — 
          we’d love to hear from you!
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Your Message</label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {status && <p style={{ marginTop: "15px", color: "#eb8900" }}>{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
