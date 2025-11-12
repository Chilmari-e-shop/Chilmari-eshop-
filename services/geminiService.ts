import { GoogleGenAI } from "@google/genai";
import { Agent, Message } from "../types";

// In a real application, the API key would be stored securely and not exposed here.
// We assume `process.env.API_KEY` is set in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Using dummy responses.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const dummyResponses: Record<string, string[]> = {
    "h2o-gpt": [
        "As H2O GPT, I can help you with a variety of tasks. What's on your mind?",
        "That's an interesting question. Let me provide some details on that.",
        "I've processed your request. Here's a summary using Markdown:\n\n*   **Bold Item 1**\n*   `code_snippet()`\n*   A list item."
    ],
    "bloom": [
        "Speaking as BLOOM, I can converse in many languages. How may I assist you?",
        "Your query is being analyzed by my multilingual model. The results are as follows.",
        "I can provide insights from a vast dataset. Here is an example in a code block:\n\n```javascript\nconsole.log('Hello, from BLOOM!');\n```"
    ]
};

let dummyResponseIndex = 0;

export const generateResponse = async (agent: Agent, prompt: string, history: Message[]): Promise<string> => {
    if (!ai) {
        // Fallback for testing when API key is not available
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        const responses = dummyResponses[agent.id] || ["This is a dummy response."];
        dummyResponseIndex = (dummyResponseIndex + 1) % responses.length;
        return responses[dummyResponseIndex];
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: history.map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            })),
            config: {
                systemInstruction: agent.systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate response from AI.");
    }
};