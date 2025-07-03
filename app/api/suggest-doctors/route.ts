import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { sampleDoctors } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  if (!notes || typeof notes !== "string") {
    return NextResponse.json(
      { error: "Notes are required and must be a string" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Check if the input is healthcare related
    const { text: checkInput } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Given the following user input, determine if it is directly related to healthcare, medical symptoms, health conditions, or personal health notes. Respond with only 'true' if it is, and 'false' if it is not.\n\nUser input: "${notes}"\n\nIs this input related to healthcare?`,
      temperature: 0,
    });

    console.log("Is healthcare related: ", checkInput);

    if (!checkInput || checkInput.trim().toLowerCase() !== "true") {
      return NextResponse.json(
        {
          error:
            "Your notes do not appear to be related to healthcare. Please enter health-related symptoms or concerns.",
        },
        { status: 422 }
      );
    }

    const { text: response } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are a medical AI assistant that suggests appropriate doctors based on patient symptoms.
          Available doctors: ${JSON.stringify(sampleDoctors)}

          Analyze the symptoms and suggest 3-5 most appropriate doctors from the available list.
          Consider the specialist field that best matches the symptoms described.

          Based on these symptoms/notes: "${notes}"

          Return a JSON array with the following structure for each suggested doctor:
          {
            "doctor": {
              "id": "id",
              "name": "name",
              "specialist": "specialist",
              "description": "description",
              "image": "image",
              "agentPrompt": "agentPrompt",
              "voiceId": "voiceId",
              "subscriptionRequired": "subscriptionRequired"
            },
            "reason": "Detailed explanation of why this doctor is suitable for the symptoms",
            "confidence": "unique confidence level ranging from 1-5 for suggesting the specific doctor"
          }

          Requirements:
          - Suggest exactly 3-5 doctors
          - Include ALL doctor properties from the available list (id, name, specialist, description, image, agentPrompt, voiceId, subscriptionRequired)
          - Provide clear reasoning for each suggestion
          - Assign confidence scores between 1-5 based on symptom-specialty match
          - Return only valid JSON, no additional text
      `,
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      maxTokens: 2000,
      frequencyPenalty: 0.1,
      presencePenalty: 0.1,
    });

    if (!response) {
      return NextResponse.json(
        { error: "No response from AI model" },
        { status: 500 }
      );
    }

    // Parsing the response as JSON
    try {
      // Extract JSON from markdown code blocks if present
      let jsonString = response;
      if (response.includes("```json")) {
        jsonString = response
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
      }

      const parsedResponse = JSON.parse(jsonString);
      return NextResponse.json(parsedResponse, { status: 200 });
    } catch (parseError) {
      return NextResponse.json(
        {
          error: `Invalid JSON response from AI model: ${[parseError]}`,
          rawResponse: response,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
