import { GoogleGenAI } from "@google/genai";

export const googleGenAiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // make sure this is in .env
});
