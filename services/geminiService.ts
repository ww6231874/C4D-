import { GoogleGenAI, Type } from "@google/genai";
import { Palette, Language } from "../types";

export const generateAiPalettes = async (prompt: string, lang: Language = 'zh'): Promise<Palette[]> => {
  try {
    // Initialize the client inside the function to ensure process.env.API_KEY is populated
    // after the user selects their key in the UI.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const langInstruction = lang === 'zh' 
      ? "Give each palette a creative, artistic name in Chinese (Simplified Chinese) and tags in Chinese."
      : "Give each palette a creative, artistic name in English and tags in English.";

    const fullPrompt = `Generate 4 distinct color palettes based on the theme: "${prompt}". 
    Each palette must have exactly 4 hex colors. 
    ${langInstruction}
    Return strictly JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              colors: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "[]");
    
    // Add IDs and defaults
    return data.map((item: any, idx: number) => ({
      ...item,
      id: `ai-${Date.now()}-${idx}`,
      likes: Math.floor(Math.random() * 1000)
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};