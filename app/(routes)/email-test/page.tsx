"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { LoaderCircle } from "lucide-react";

const TestEmailSend = () => {
  const { userDetails } = useContext(UserDetailContext) || {};
  const [loading, setLoading] = useState(false);

  const content =
    "Hello, this is a test email from John Carlo Misa powered by NodeMailer and NextJS";

  const handleSendEmail = async () => {
    setLoading(true);

    if (!userDetails?.email) {
      toast.error("No user email available");
      return;
    }

    try {
      const response = await axios.post(
        "/api/send-email",
        {
          sendTo: userDetails.email,
          message: content,
        },
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        toast.success("Email sent successfully");
      }
    } catch {
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSendEmail}
      className="cursor-pointer"
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        "Send Email"
      )}
    </Button>
  );
};

export default TestEmailSend;
