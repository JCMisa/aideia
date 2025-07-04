import { db } from "@/config/db";
import { SessionChat } from "@/config/schema";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    messages,
    sessionDetail,
    selectedDoctor,
  }: {
    messages: SavedMessage[];
    sessionDetail: SessionChatType;
    selectedDoctor: DoctorType;
  } = await req.json();

  if (!messages || messages.length === 0 || !sessionDetail || !selectedDoctor) {
    return NextResponse.json(
      { error: "Messages and session details are required" },
      { status: 400 }
    );
  }

  try {
    // add the messages as property of conversation if necessary, i remove it for now since conversation summary is already provided
    const { text: report } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are an AI Medical Voice Agent that has just completed a voice conversation with a patient. Your task is to generate a comprehensive conversation summary and a detailed medical report based on the dialogue.

        Output must be a single JSON object with exactly two top-level properties: "conversation" (an object) and "report" (an object).

        IMPORTANT INSTRUCTIONS:
        - As the AI agent, you must always provide possible medications, prescriptions, and medical advice based on the conversation, unless the patient's situation is advanced, severe, or requires emergency intervention. In such emergency or advanced cases, instruct the patient to seek immediate real-world medical attention.
        - If it is possible and appropriate for the AI to provide medications or prescriptions, you must do so. Do not hesitate, defer, or state that you cannot provide medication or advice because you are a virtual doctor. Never say that you are unable to recommend medications or treatments due to being an AI or virtual agent.
        - Only in cases where the patient's symptoms indicate a medical emergency or require in-person evaluation (e.g., severe chest pain, difficulty breathing, loss of consciousness, signs of stroke, etc.), you may instruct the patient to seek immediate real-world medical care, but otherwise, always provide actionable medication and prescription recommendations as if you are a real doctor.

        Here are the conversation messages:
        ${JSON.stringify(messages, null, 2)}

        The "conversation" object must include:
        1.  "sessionId": ${sessionDetail.sessionChatId}
        2.  "agentName": "${selectedDoctor.name}"
        3.  "patientEmail": "${sessionDetail.createdBy}"
        4.  "timestamp": "${new Date().toISOString()}"
        5.  "chiefComplaint": A concise, one-sentence summary of the patient's primary health concern or reason for the consultation.
        6.  "conversationSummary": A detailed 5-10 sentence narrative summarizing the entire conversation flow, including the patient's initial concerns, key questions asked by the agent, and the general direction of the dialogue.

        The "report" object must include:
        1.  "diagnoses": A list of potential medical diagnoses or conditions discussed, if any. Provide clinical names where appropriate.
        2.  "symptomsReported": A detailed list of all symptoms the patient mentioned, along with any relevant descriptors (e.g., "throbbing headache," "intermittent cough," "localized pain in lower back").
        3.  "symptomDuration": The reported duration for which the patient has experienced their symptoms if mentioned (e.g., "3 days," "2 weeks," "since yesterday morning").
        4.  "symptomSeverity": Your assessment of the overall severity of the patient's symptoms. Choose from "mild," "moderate," or "severe." Justify your assessment briefly if possible.
        5.  "medicationsMentioned": A list of any medications the patient explicitly mentioned taking or inquiring about, including dosage if provided.
        6.  "medicationsRecommended": A list of specific medications or over-the-counter remedies recommended by the AI agent during the conversation, along with suggested dosages or frequency if applicable. You must always provide possible medications and prescriptions, and never state that you cannot provide them unless it is a clear emergency or advanced case requiring real-world care.
        7.  "treatmentPlanRecommendations": A list of actionable advice or next steps provided by the AI agent (e.g., "get plenty of rest," "stay hydrated," "apply a cold compress," "monitor temperature," "schedule an in-person consultation with a doctor within 24 hours," "go to the nearest emergency room immediately").
        8.  "additionalNotes": Any other pertinent details from the conversation that don't fit into the above categories, such as patient history, allergies mentioned, or lifestyle factors.

        Example output:
        {
          "conversation": {
            "sessionId": "...",
            "agentName": "...",
            "patientEmail": "...",
            "timestamp": "...",
            "chiefComplaint": "...",
            "conversationSummary": "..."
          },
          "report": {
            "diagnoses": [],
            "symptomsReported": [],
            "symptomDuration": "",
            "symptomSeverity": "",
            "medicationsMentioned": [],
            "medicationsRecommended": [],
            "treatmentPlanRecommendations": [],
            "additionalNotes": ""
          }
        }
      `,
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      maxTokens: 2000,
      frequencyPenalty: 0.1,
      presencePenalty: 0.1,
    });

    if (!report) {
      return NextResponse.json(
        { error: "No report generated from AI model" },
        { status: 500 }
      );
    }

    // Parsing the report as JSON
    try {
      // Extract JSON from markdown code blocks if present
      let reportString = report;
      if (report.includes("```json")) {
        reportString = report
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
      }

      const parsedReport = JSON.parse(reportString);

      console.log("Medical Report API Parsed Report: ", parsedReport);

      // save to database the conversation and report
      const result = await db
        .update(SessionChat)
        .set({
          conversation: parsedReport.conversation || null,
          report: parsedReport.report || null,
        })
        .where(eq(SessionChat.sessionChatId, sessionDetail.sessionChatId));

      if (result) {
        return NextResponse.json(parsedReport, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Failed to update session chat with report" },
          { status: 500 }
        );
      }
    } catch (parseError) {
      return NextResponse.json(
        {
          error: `Invalid JSON response from AI model: ${[parseError]}`,
          rawResponse: report,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Medical Report API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
