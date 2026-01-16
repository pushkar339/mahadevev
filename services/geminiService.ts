import { GoogleGenAI } from "@google/genai";

export const getScooterRecommendation = async (query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I'm unable to connect to the AI service right now. Please try again later.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using a reliable model for text tasks
    const modelId = 'gemini-3-flash-preview';

    const systemPrompt = `
      You are an expert sales concierge for 'Veloce', a premium electric scooter brand.
      Our scooters are known for minimalist design, high speed, and long range.
      We have two main models:
      1. Veloce Model S (Sport): 60mph max speed, 40 mile range, aggressive stance. Price: $3,999.
      2. Veloce Model X (Explorer): 45mph max speed, 75 mile range, comfortable cruising. Price: $4,499.
      
      Your goal is to recommend the best scooter based on the user's input.
      Keep your answer short, punchy, and helpful. Max 2-3 sentences.
      Tone: Professional, sleek, tech-focused (like Apple or Vercel).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: query,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text || "I couldn't generate a recommendation at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a temporary glitch. Please ask again.";
  }
};