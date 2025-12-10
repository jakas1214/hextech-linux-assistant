import { GoogleGenAI } from "@google/genai";
import { LinuxDistro, InstallMethod, ScriptResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateInstallGuide = async (
  distro: LinuxDistro,
  method: InstallMethod
): Promise<ScriptResponse> => {
  try {
    const prompt = `
      You are an expert Linux Gaming engineer. 
      Generate a robust bash installation script and a brief set of text instructions to install League of Legends on ${distro} using ${method}.
      
      Requirements:
      1. The script must install necessary dependencies (wine, vulkan drivers, etc.) for the specific distro.
      2. The script should be safe and check for root where necessary.
      3. Provide the output in JSON format with two keys: "script" (the bash code) and "instructions" (markdown text explaining the steps).
      
      Output JSON Schema:
      {
        "script": "string",
        "instructions": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: "You are a helpful Linux assistant specialized in gaming setup. Be concise and technical.",
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as ScriptResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      script: "# Error generating script. Please check your API key and try again.",
      instructions: "Failed to communicate with the Hextech Core (Gemini API)."
    };
  }
};

export const generateAntiCheatConfig = async (
  distro: LinuxDistro
): Promise<ScriptResponse> => {
  try {
    const prompt = `
      You are an expert Linux Gaming engineer specialized in Anti-Cheat compatibility and Account Safety.
      League of Legends uses Vanguard, a kernel-level anti-cheat.
      
      The user wants to configure ${distro} to run League of Legends WITHOUT triggering bans.
      
      Generate a guide and a bash script.
      
      CRITICAL SAFETY RULES:
      1. Do NOT suggest methods that modify the game binary, inject memory, or attempt to bypass Vanguard. These cause immediate bans.
      2. If Vanguard is currently incompatible with Linux (Wine/Proton), explicitly state this truth first.
      3. Focus the script on checking "Legitimate" requirements: 
         - Verify Secure Boot is enabled (mokutil).
         - Verify TPM 2.0 is active.
         - Check IOMMU groups (if relevant for VM passthrough, though warn that VMs might also be flagged).
      4. Provide diagnostics to help the user prove their system integrity.
      
      Output JSON Schema:
      {
        "script": "string", // A safe diagnostic script
        "instructions": "string" // Clear warnings and setup steps
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: "You are a principled security expert. You prioritize user account safety over forcing the game to run.",
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as ScriptResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      script: "# Error connecting to Hextech Core.",
      instructions: "Could not retrieve Anti-Cheat protocols."
    };
  }
};

export const diagnoseIssue = async (
  distro: LinuxDistro,
  errorLog: string,
  history: { role: string; content: string }[]
): Promise<string> => {
  try {
    // Construct conversation history for context
    const conversation = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add the new query
    const prompt = `
      I am trying to run League of Legends on ${distro}.
      Here is the error log or description of the problem:
      "${errorLog}"
      
      Provide a specific, step-by-step fix. If it requires terminal commands, formatted them clearly.
      Keep it under 300 words if possible. Focus on solution.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...conversation.map(c => ({ role: c.role, parts: c.parts })), 
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    return response.text || "I couldn't analyze the issue. Please try providing more details.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to the Oracle severed. Please try again.";
  }
};