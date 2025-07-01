declare interface UserType {
  id: number;
  clerkId: string;
  name: string;
  email: string;
  image?: string | null;
  credits?: number | null;
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
  notes: string;
  conversation: TConversation; // Stored as JSON in the database
  report: TReport; // Stored as JSON in the database
  createdAt: Date;
}
