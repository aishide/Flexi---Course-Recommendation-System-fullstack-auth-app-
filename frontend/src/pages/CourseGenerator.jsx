import React, { useState } from "react";

export default function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedCourse("");

    try {
      const userInput = `Topic: ${topic}, Level: ${level}, Duration: ${duration}`;

      const res = await fetch("http://localhost:5000/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();

      let raw = data.recommendations || data; 
      let parsed;

      try {
        // Remove any backticks or "```json"
        let cleaned = raw
          .toString()
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

        parsed = JSON.parse(cleaned);
      } catch (err) {
        // Not JSON → show plain text
        setGeneratedCourse(raw.toString());
        setLoading(false);
        return;
      }

      if (Array.isArray(parsed)) {
        const textVersion = parsed
          .map(
            (c, i) =>
              `🎓 ${i + 1}. ${c.title}\n📘 Difficulty: ${c.difficulty}\n📝 ${c.description}`
          )
          .join("\n\n------------------------\n\n");

        setGeneratedCourse(textVersion);
      } else {
        setGeneratedCourse(raw.toString());
      }
    } catch (err) {
      console.error("Error:", err);
      setGeneratedCourse("❌ Error generating course. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="main-page">
      <h1>AI Course Recommendation</h1>
      <p>Get a custom AI-powered learning path.</p>

      <form className="course-form" onSubmit={handleGenerate}>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          type="text"
          placeholder="Duration (e.g. 4 weeks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Course"}
        </button>
      </form>

      {generatedCourse && (
        <div className="generated-course">
          <pre style={{ whiteSpace: "pre-wrap" }}>{generatedCourse}</pre>
        </div>
      )}
    </div>
  );
}
