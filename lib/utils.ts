import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx";
import { ilike, sql } from "drizzle-orm";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const withErrorHandling = <T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>
) => {
  return async (...args: A): Promise<T> => {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return errorMessage as unknown as T;
    }
  };
};

export const configureAssistant = (voiceId: string) => {
  const vapiAssistant: CreateAssistantDTO = {
    name: "{{ doctorName }}",
    firstMessage: `Hello, I am {{ doctorName }}, your {{ doctorSpeciality }}. I'm here to discuss {{ topic }} and help you with your health concerns. Please tell me more about your symptoms or questions.
    `,
    transcriber: {
      provider: "assembly-ai",
      language: "en",
    },
    voice: {
      provider: "vapi",
      voiceId: voiceId as
        | "Elliot"
        | "Kylie"
        | "Rohan"
        | "Lily"
        | "Savannah"
        | "Hana"
        | "Neha"
        | "Cole"
        | "Harry"
        | "Paige"
        | "Spencer",
      speed: 1.1,
    },
    model: {
      provider: "google",
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: `You are {{ doctorName }}, a highly qualified {{ doctorSpeciality }}.\n\n{{ doctorDescription }}\n\nYour prompt: {{ doctorPrompt }}\n\nSession Topic: {{ topic }}\n\n---\n\nAs a virtual doctor, your goal is to provide the patient with a realistic, thorough, and empathetic consultation.\n\n- Begin by greeting the patient and asking about their main symptoms or concerns related to {{ topic }}.\n- Use your expertise as a {{ doctorSpeciality }} to ask relevant follow-up questions and gather a detailed history.\n- Based on the patient's responses, provide a differential diagnosis, explaining your reasoning in clear, accessible language.\n- Offer evidence-based advice, including possible diagnoses, recommended next steps, and when appropriate, suggest over-the-counter or prescription medications.\n- Clearly explain the purpose, dosage, and precautions for any medication you recommend.\n- If symptoms suggest a serious or urgent condition, advise the patient to seek immediate in-person care and explain why.\n- Throughout the conversation, maintain a supportive, professional, and reassuring tone.\n- Encourage the patient to ask questions and confirm their understanding.\n- Conclude the session by summarizing your advice and next steps.\n\nNever provide a diagnosis or prescription outside your specialty. Always prioritize patient safety and clarity.\n\nLet's begin the consultation. Greet the patient and ask about their main concern regarding {{ topic }}.`,
        },
      ],
    },
    clientMessages: undefined,
    serverMessages: undefined,
  };
  return vapiAssistant;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doesTitleMatch = (sessionChat: any, searchQuery: string) =>
  ilike(
    sql`REPLACE(REPLACE(REPLACE(LOWER(${sessionChat.notes}), '-', ''), '.', ''), ' ', '')`,
    `%${searchQuery.replace(/[-. ]/g, "").toLowerCase()}%`
  );

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const updateURLParams = (
  currentParams: URLSearchParams,
  updates: Record<string, string | null | undefined>,
  basePath: string = "/"
): string => {
  const params = new URLSearchParams(currentParams.toString());

  // Process each parameter update
  Object.entries(updates).forEach(([name, value]) => {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
  });

  return `${basePath}?${params.toString()}`;
};
