import { GoogleGenAI } from "@google/genai";
import { UserInput } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const streamInterviewPrep = async (
  input: UserInput,
  onChunk: (text: string) => void
) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Use gemini-3-pro-preview for high reasoning capability and context window
  const model = "gemini-3-pro-preview";

  // Strictly enforce the count in the user prompt
  const userPrompt = `
  SUBJECT: ${input.topic}
  
  MISSION OBJECTIVES:
  1. Generate EXACTLY 100 unique interview questions.
  2. Follow the SYSTEM_PROMPT format strictly.
  3. Ensure Q1 through Q100 are all present.
  4. Failure to reach Q100 is not an option. Prioritize brevity in later sections to ensure completion.
  
  EXECUTE PROTOCOL.`;

  try {
    const streamResult = await ai.models.generateContentStream({
      model: model,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 8192, // Maximize output for the long list
      },
    });

    for await (const chunk of streamResult) {
      const text = chunk.text;
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};