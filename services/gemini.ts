import { GoogleGenAI, Type } from "@google/genai";
import { Message } from "../types";

// NOTE: In a real production app, you would proxy this through a backend to hide the key.
// Since this is a client-side demo request, we assume the environment variable is present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExplanation = async (topic: string, question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a fun, energetic coding tutor for teenagers (11-15 years old). 
      The current topic is: ${topic}.
      The student asks: "${question}".
      
      Provide a short, simple explanation using analogies (like video games, building blocks, or pizza). 
      Keep it under 100 words. Use emojis.`,
    });
    return response.text || "Sorry, I couldn't explain that right now. Try again!";
  } catch (error) {
    console.error(error);
    return "Oops! My brain froze. Please check your API key.";
  }
};

export const generateQuiz = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a multiple choice question about: ${topic}. Target audience: 13 year old beginner coder.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswerIndex: { type: Type.INTEGER }
          }
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(error);
    return null;
  }
};