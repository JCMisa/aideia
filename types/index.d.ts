declare interface UserType {
  id: number;
  clerkId: string;
  name: string;
  email: string;
  image?: string | null;
  credits: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface ConsultationType {
  consultationId: string;
  userId: string;
  imageUrl: string;
  name: string;
  email: string;
  doctorName: string;
  conditionName: string;
  conditionSeverity: string;
  createdAt: Date;
}

declare interface DoctorType {
  id: number;
  name: string;
  specialist: string;
  image: string;
  description: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
}

declare interface SuggestedDoctorType {
  doctor: DoctorType;
  reason: string;
  confidence: number;
}

declare interface SessionChatType {
  id: number;
  sessionChatId: string;
  createdBy: string;
  notes: string | null;
  selectedDoctor: TSelectedDoctor; // Stored as JSON in the database
  conversation: TConversation; // Stored as JSON in the database
  report: TReport; // Stored as JSON in the database
  createdAt: Date;
}

declare interface Params {
  params: Promise<Record<string, string>>;
}

declare interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

declare interface SessionConversationType {
  sessionId: string;
  agentName: string;
  patientEmail: string;
  timestamp: Date;
  // messages:
  //   | {
  //       role: string;
  //       content: string;
  //     }[]
  //   | null;
  chiefComplaint: string | null;
  conversationSummary: string | null;
}

declare interface SessionReportType {
  diagnoses: string[] | null;
  symptomsReported: string[] | null;
  symptomDuration: string | null;
  symptomSeverity: string | null;
  medicationsMentioned: string[] | null;
  medicationsRecommended: string[] | null;
  treatmentPlanRecommendations: string[] | null;
  additionalNotes: string | null;
}

declare interface SearchParams {
  searchParams: Promise<Record<string, string | undefined>>;
}
