import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google GenAI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], pageContext = "" } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Build the system instruction to keep PageAgent grounded in SASSA resource rules
    const systemInstruction = `You are "PageAgent", the official, highly trustworthy AI Assistant for the SASSA Public Assistance Knowledge Base.
Your goal is to help South African beneficiaries understand social grants, status codes, payment dates, and appeal processes.

Current date & context: ${new Date().toISOString()}.
Page Context (the content of the page the user is currently viewing):
"""
${pageContext}
"""

Guidelines:
1. Ground your answers primarily in the Page Context provided above.
2. If the answer is present in the Page Context, summarize or explain it clearly and simply using bullet points and professional, sympathetic language.
3. If the user asks a question not fully answered in the Page Context, use your built-in Google Search capability to find the latest verified SASSA information.
4. Keep answers concise, highly readable, and structured. Avoid jargon. Use South African terms like "R370", "pension", "means test", "UIF", and "NSFAS" appropriately.
5. Never ask the user for their personal information, banking details, or full ID number. If they offer it, politely remind them to keep it secure.
6. When referencing external links, guide them to official portals (e.g. srd.sassa.gov.za or srd.dsd.gov.za).`;

    // Map conversation history to the parts array for Gemini content structure
    const contents = [];

    // Add prior conversation history
    for (const msg of history) {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      });
    }

    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini 3.5 Flash with Google Search Grounding enabled
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.2,
        tools: [{ googleSearch: {} }] // Enable Google Search grounding for accurate real-time query answers
      }
    });

    const text = response.text || "I apologize, but I was unable to compile an answer at this moment. Please try asking again.";
    
    // Extract search grounding metadata sources if present
    const sources = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      for (const chunk of chunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "Official Resource",
            url: chunk.web.uri
          });
        }
      }
    }

    return NextResponse.json({
      text,
      sources: sources.filter((v, i, a) => a.findIndex(t => t.url === v.url) === i) // deduplicate
    });

  } catch (error: any) {
    console.error("PageAgent API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat. Make sure GEMINI_API_KEY is configured in your secrets." },
      { status: 500 }
    );
  }
}
