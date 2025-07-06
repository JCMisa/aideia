import DeleteSession from "@/app/(routes)/session/[sessionId]/_components/DeleteSession";
import Image from "next/image";
import Link from "next/link";

interface SessionCardProps {
  sessionChatId: string;
  notes: string;
  selectedDoctor: DoctorType;
  conversation: SessionConversationType;
  report: SessionReportType;
  createdAt: Date;
  userImg: string;
  username: string;
}

const SessionCard = ({
  sessionChatId,
  notes,
  selectedDoctor,
  conversation,
  report,
  createdAt,
  userImg,
  username,
}: SessionCardProps) => {
  return (
    <div className="bg-card dark:bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-border">
      {/* Header with doctor image and basic info */}
      <div className="relative">
        {selectedDoctor.image ? (
          <Image
            src={selectedDoctor.image}
            alt={`${selectedDoctor.name} - ${selectedDoctor.specialist}`}
            width={400}
            height={192}
            className="w-full h-48 object-cover"
            priority={false}
          />
        ) : (
          <Image
            src={"/empty-img.png"}
            alt={"no-image"}
            width={400}
            height={192}
            className="w-full h-48 object-cover"
            priority={false}
          />
        )}

        <div className="absolute top-3 right-3">
          <DeleteSession sessionId={sessionChatId} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">
            {selectedDoctor.name}
          </h3>
          <p className="text-white/90 text-sm">{selectedDoctor.specialist}</p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 space-y-3">
        {/* Session title/notes */}
        <div>
          <h4 className="font-medium text-card-foreground dark:text-card-foreground text-sm line-clamp-2">
            {notes || "No title provided"}
          </h4>
        </div>

        {/* User info */}
        <div className="flex items-center gap-2">
          <Image
            src={userImg || "/assets/icons/default-avatar.svg"}
            alt={username}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{username}</span>
        </div>

        {/* Session details */}
        {conversation !== null && report !== null ? (
          <div className="space-y-2">
            {conversation.chiefComplaint && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Chief Complaint:</span>{" "}
                {conversation.chiefComplaint}
              </div>
            )}

            {report.symptomSeverity && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Severity:</span>{" "}
                {report.symptomSeverity}
              </div>
            )}
          </div>
        ) : (
          <p className="flex items-center justify-center text-center text-sm text-muted-foreground">
            No session report to show.
          </p>
        )}

        {/* Date and action button */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <time className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          <Link
            href={`/session/${sessionChatId}/report`}
            className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded-md transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
