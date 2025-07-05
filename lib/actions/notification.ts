"use server";

import axios from "axios";
import { withErrorHandling } from "../utils";
import { getCurrentUser } from "./users";

// --------------------------- Server Actions ---------------------------
export const sendEmail = withErrorHandling(
  async (sendTo: string, message: string, subject?: string) => {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user || !user.email) {
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      "/api/send-email",
      {
        sendTo: sendTo,
        message: message,
        subject: subject,
      },
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      return { success: true, message: "Email sent successfully" };
    } else {
      throw new Error("Email not sent");
    }
  }
);
