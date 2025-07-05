import EmptyState from "@/components/custom/EmptyState";
import { getSessionChatBySessionId } from "@/lib/actions/sessions";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import AssistantSection from "./_components/AssistantSection";
import { getCurrentUser } from "@/lib/actions/users";

const SessionPage = async ({ params }: Params) => {
  let sessionId: string | undefined;

  // Handle params as a Promise<Record<string, string>>
  try {
    const resolvedParams = await params;
    sessionId = resolvedParams?.sessionId;
  } catch {
    sessionId = undefined;
  }

  // Check if there is a sessionId
  if (!sessionId || typeof sessionId !== "string" || sessionId.length === 0) {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title="No Session ID Found"
          description="It looks like you haven't had any session with our AI doctor yet. When you do, it will show up here!"
        />
      </div>
    );
  }

  let user: UserType | null = null;
  let sessionChat: SessionChatType | null = null;
  let errorMsg: string | null = null;
  try {
    const [currentUser, chat] = await Promise.all([
      getCurrentUser(),
      getSessionChatBySessionId(sessionId),
    ]);
    if (currentUser) {
      user = currentUser;
    }
    sessionChat = chat;
  } catch (error) {
    // Security: Don't leak sensitive error details to the user
    if (error instanceof Error) {
      if (error.message.includes("Forbidden")) {
        errorMsg = "You do not have access to this session.";
      } else if (error.message.includes("Unauthorized")) {
        errorMsg = "You must be logged in to view this session.";
      } else if (error.message.includes("Session not found")) {
        errorMsg = "No session found for this ID.";
      } else if (error.message.includes("Invalid or missing sessionId")) {
        errorMsg = "Invalid session ID.";
      } else {
        errorMsg = "An unexpected error occurred. Please try again later.";
      }
    } else {
      errorMsg = "An unexpected error occurred. Please try again later.";
    }
    sessionChat = null;
  }

  if (!sessionChat) {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title={errorMsg ? "Session Error" : "No Session Found"}
          description={
            errorMsg ||
            "It looks like you haven't had any session with our AI doctor yet. When you do, they'll show up here!"
          }
        />
      </div>
    );
  }

  // Defensive rendering for selectedDoctor
  const selectedDoctor: DoctorType =
    typeof sessionChat.selectedDoctor === "object" && sessionChat.selectedDoctor
      ? sessionChat.selectedDoctor
      : {};

  return (
    <main className="flex flex-col space-y-4">
      <article className="flex rounded-lg shadow-lg justify-between p-6 max-md:flex-col">
        <div className="flex items-start gap-2">
          {/* Image container with fixed size and no shrink/grow */}
          <div
            className="flex items-center justify-center rounded-lg max-md:hidden flex-shrink-0 flex-grow-0"
            style={{ minWidth: 80, minHeight: 80 }}
          >
            <Image
              src={selectedDoctor.image || "/empty-img.png"}
              loading="lazy"
              blurDataURL="/blur.jpg"
              alt={selectedDoctor.name}
              width={80}
              height={80}
              className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 w-[80px] h-[80px] object-cover"
              style={{
                minWidth: 80,
                minHeight: 80,
                maxWidth: 80,
                maxHeight: 80,
              }}
            />
          </div>

          {/* Content container that can grow/shrink */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <p
                className="font-bold text-2xl truncate max-w-xs"
                title={selectedDoctor.name}
              >
                {selectedDoctor.name}
              </p>
              <div
                className="p-1 px-5 rounded-full bg-primary/30 backdrop-blur-md text-xs max-sm:hidden line-clamp-1 border border-primary/40 shadow-sm truncate max-w-[180px]"
                title={selectedDoctor.specialist}
              >
                {selectedDoctor.specialist}
              </div>
            </div>
            <p
              className="text-lg text-muted-foreground w-full line-clamp-2 break-words"
              title={sessionChat.notes || ""}
            >
              {sessionChat.notes}
            </p>
          </div>
        </div>
        <div className="text-sm max-md:hidden flex items-center gap-2">
          <CalendarIcon className="size-4" />{" "}
          {new Date(sessionChat.createdAt).toLocaleDateString()}
        </div>
      </article>

      <AssistantSection
        user={user}
        sessionChat={sessionChat}
        selectedDoctor={selectedDoctor}
      />
    </main>
  );
};

export default SessionPage;
