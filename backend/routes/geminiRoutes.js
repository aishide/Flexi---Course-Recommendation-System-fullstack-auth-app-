import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/generate-course
router.post("/generate-course", async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "User input is required" });
    }

    // Use Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an AI course recommender. Based on this user's description:
      "${userInput}"
      Recommend a personalized set of 3–5 courses.
      Format the response as JSON like:
      {
        "title": "string",
        "description": "string",
        "difficulty": "beginner|intermediate|advanced"
      }
    `;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.json({ recommendations: text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

export default router;
