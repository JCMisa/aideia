declare interface UserType {
  id: number;
  clerkId: string;
  name: string;
  email: string;
  image?: string | null;
  credits?: number | null;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
