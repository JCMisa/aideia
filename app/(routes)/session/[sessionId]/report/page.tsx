import EmptyState from "@/components/custom/EmptyState";
import { Badge } from "@/components/ui/badge";
import { sampleDoctors } from "@/constants";
import { getSessionChatBySessionId } from "@/lib/actions/sessions";
import { getCurrentUser, getUserByEmail } from "@/lib/actions/users";
import { ArrowLeftIcon, CrossIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SessionReportPage = async ({ params }: Params) => {
  let sessionId: string | undefined;

  // Handle params as a Promise<Record<string, string>>
  try {
    const resolvedParams = await params;
    sessionId = resolvedParams?.sessionId;
  } catch {
    sessionId = undefined;
  }

  let user: UserType | null = null;
  let session: SessionChatType | null = null;
  let errorMsg: string | null = null;
  try {
    const [currentUser, sessionChat] = await Promise.all([
      getCurrentUser(),
      getSessionChatBySessionId(sessionId as string),
    ]);
    if (currentUser) {
      user = currentUser;
    }
    if (sessionChat) {
      session = sessionChat;
    }
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
    session = null;
  }

  if (!user) {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title={errorMsg ? "Authentication Error" : "No User Found"}
          description={errorMsg || "You must be logged in to view this report."}
        />
      </div>
    );
  }

  if (!session) {
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

  if (user.email !== session.createdBy && user.role !== "admin") {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title="Access Denied"
          description="You do not have permission to view this session report. Only the session creator can access this report."
        />
      </div>
    );
  }

  if (!session.conversation || !session.report) {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title={
            errorMsg
              ? "Session Error"
              : "No Session Conversation or Report Found"
          }
          description={
            errorMsg ||
            "It looks like there's no conversation or report available for this session yet. Please complete your consultation to view the report."
          }
        />
      </div>
    );
  }

  const sessionConversation: SessionConversationType = session.conversation;
  const sessionReport: SessionReportType = session.report;
  const patient: UserType = await getUserByEmail(
    sessionConversation.patientEmail
  );
  const agent: DoctorType | undefined = sampleDoctors.find(
    (doctor: DoctorType) => doctor.name === sessionConversation.agentName
  );

  if (!patient) {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title="Patient Not Found"
          description="The patient for this session could not be found."
        />
      </div>
    );
  }

  if (!agent) {
    return (
      <div>
        <EmptyState
          icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
          title="Doctor Agent Not Found"
          description="The doctor agent for this session could not be found."
        />
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-2">
      <Link href={"/dashboard"} className="flex items-center gap-1">
        <ArrowLeftIcon className="size-4" /> Back to Dashboard
      </Link>
      <div className="flex flex-col space-y-6 gap-6 px-5 sm:px-10 md:px-20">
        {/* patient profile */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-3 rounded-lg shadow-2xl w-full">
          {/* basic info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Image
              src={patient.image || "/empty-img.png"}
              alt={patient.name || "Unknown"}
              width={100}
              height={100}
              loading="lazy"
              blurDataURL="/blur.jpg"
              placeholder="blur"
              sizes="(max-width: 640px) 60px, 100px"
              className="rounded-full object-cover w-[100px] h-[100px] max-sm:w-[60px] max-sm:h-[60px]"
              priority={false}
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">{patient.email}</p>
            </div>
          </div>
          {/* credits info */}
          <div className="flex items-start">
            <Badge className="flex items-center gap-2 py-2" variant={"outline"}>
              <StarIcon className="size-4 text-yellow-500" /> {patient.credits}{" "}
              Credits Left
            </Badge>
          </div>
        </div>

        {/* doctor agent profile */}
        <div className="flex flex-col gap-4 w-full px-10">
          <h2 className="text-sm text-muted-foreground font-bold">
            Doctor Agent Information
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Image
                src={agent.image || "/empty-img.png"}
                alt={agent.name || "Unknown"}
                width={80}
                height={80}
                loading="lazy"
                blurDataURL="/blur.jpg"
                placeholder="blur"
                sizes="(max-width: 640px) 50px, 80px"
                className="rounded-full object-cover w-[80px] h-[80px] max-sm:w-[50px] max-sm:h-[50px]"
                priority={false}
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{agent.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Badge
                className="flex items-center gap-2 py-2"
                variant={"outline"}
              >
                <CrossIcon className="size-4 text-primary" /> {agent.specialist}
              </Badge>
            </div>
          </div>
        </div>

        {/* conversation and report grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 w-full">
          {/* conversation */}
          <div className="w-full flex flex-col gap-4 relative">
            <h2 className="text-sm text-muted-foreground font-bold">
              Session Conversation Summary
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {sessionConversation.chiefComplaint}
            </p>
            {/* summary */}

            <div className="mt-5 max-h-80 overflow-y-auto no-scrollbar pb-14 text-sm">
              {sessionConversation.conversationSummary}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
          </div>
          {/* report */}
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-sm text-muted-foreground font-bold">
              Session Report
            </h2>

            {/* Diagnoses */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Diagnoses
              </h3>
              {sessionReport.diagnoses && sessionReport.diagnoses.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {sessionReport.diagnoses.map((diagnosis, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {diagnosis}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No diagnoses recorded
                </p>
              )}
            </div>

            {/* Symptoms */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Symptoms Reported
              </h3>
              {sessionReport.symptomsReported &&
              sessionReport.symptomsReported.length > 0 ? (
                <ul className="space-y-1">
                  {sessionReport.symptomsReported.map((symptom, index) => (
                    <li
                      key={index}
                      className="text-xs text-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No symptoms recorded
                </p>
              )}
            </div>

            {/* Duration & Severity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Duration
                </h3>
                <p className="text-xs text-muted-foreground">
                  {sessionReport.symptomDuration || "Not specified"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Severity
                </h3>
                <p className="text-xs text-muted-foreground capitalize">
                  {sessionReport.symptomSeverity || "Not specified"}
                </p>
              </div>
            </div>

            {/* Medications Mentioned */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Medications Mentioned
              </h3>
              {sessionReport.medicationsMentioned &&
              sessionReport.medicationsMentioned.length > 0 ? (
                <ul className="space-y-1">
                  {sessionReport.medicationsMentioned.map(
                    (medication, index) => (
                      <li
                        key={index}
                        className="text-xs text-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        {medication}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No medications mentioned
                </p>
              )}
            </div>

            {/* Recommended Medications */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Recommended Medications
              </h3>
              {sessionReport.medicationsRecommended &&
              sessionReport.medicationsRecommended.length > 0 ? (
                <ul className="space-y-2">
                  {sessionReport.medicationsRecommended.map(
                    (medication, index) => (
                      <li
                        key={index}
                        className="text-xs text-foreground bg-muted/50 p-2 rounded-md"
                      >
                        {medication}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No medications recommended
                </p>
              )}
            </div>

            {/* Treatment Plan */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Treatment Plan
              </h3>
              {sessionReport.treatmentPlanRecommendations &&
              sessionReport.treatmentPlanRecommendations.length > 0 ? (
                <ul className="space-y-2">
                  {sessionReport.treatmentPlanRecommendations.map(
                    (recommendation, index) => (
                      <li
                        key={index}
                        className="text-xs text-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        {recommendation}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No treatment plan provided
                </p>
              )}
            </div>

            {/* Additional Notes */}
            {sessionReport.additionalNotes && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Additional Notes
                </h3>
                <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                  {sessionReport.additionalNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SessionReportPage;
