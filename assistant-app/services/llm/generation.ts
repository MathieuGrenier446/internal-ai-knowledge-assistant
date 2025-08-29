import { googleGenAiClient } from "@/services/llm/gemini";

export async function generateSuggestedTitle(message: string) {
  const response = await googleGenAiClient.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Generate ONE conversation title (maximum 4 words) for this message. Return only the title with no formatting: 
            
            "${message}"`,
          },
        ],
      },
    ],
  });
  if (!response.text) {
    throw new Error("Error generating title.");
  }
  return response.text
    .split("\n")[0]
    .replace(/[*•\-"']/g, "")
    .trim();
}

export async function generateResponse(message: string) {
  const response = await googleGenAiClient.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant trying your best to answer any questions in this message. If it is not a question, contextualize the message and ask how you could help: 
            
            "${message}"`,
          },
        ],
      },
    ],
  });
  if (!response.text) {
    throw new Error("Error generating title.");
  }
  return response.text
    .split("\n")[0]
    .replace(/[*•\-"']/g, "")
    .trim();
}
