
import { GoogleGenAI, Type } from "@google/genai";

// The API key must be obtained exclusively from process.env.API_KEY using a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMusicAssistantResponse = async (userPrompt: string, currentStation?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are 'Brasil Mix AI', a passionate Brazilian music expert. 
        You know everything about MPB, Samba, Sertanejo, Bossa Nova, and Brazilian culture.
        Currently, the user is listening to: ${currentStation || 'nothing yet'}.
        Respond in Portuguese (PT-BR) with a friendly, cultural vibe. 
        If asked for recommendations, suggest specific Brazilian artists or sub-genres. 
        Keep responses concise and engaging.`,
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    // Access the text property directly (it is not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um pequeno problema na sintonização da minha inteligência. Tente novamente!";
  }
};

export const getStationRecommendations = async (preferredGenres: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Com base nesses gêneros: ${preferredGenres.join(', ')}, sugira 3 tipos de rádios brasileiras que eu gostaria de ouvir e por quê.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["title", "reason"]
          }
        }
      }
    });
    // Access the text property and trim it before parsing as JSON
    const jsonStr = response.text?.trim() || "[]";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Recommendation error:", error);
    return [];
  }
};
