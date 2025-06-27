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
