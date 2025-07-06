import AddConsultationDialog from "@/components/custom/AddConsultationDialog";
import EmptyState from "@/components/custom/EmptyState";
import Pagination from "@/components/custom/Pagination";
import SessionCard from "@/components/custom/SessionCard";
import { Button } from "@/components/ui/button";
import { getUserSessionsWithPagination } from "@/lib/actions/sessions";
import { getCurrentUser } from "@/lib/actions/users";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const SessionHistory = async ({ searchParams }: SearchParams) => {
  const user: UserType = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { page } = await searchParams;

  const { sessions, pagination } = await getUserSessionsWithPagination(
    Number(page) || 1
  );

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen pt-12.5 pb-20 gap-9 my-2">
      <div className="w-full flex items-center justify-between gap-4">
        <Button variant={"outline"} className="flex items-center gap-2">
          <StarIcon className="size-4 text-yellow-500" /> {user.credits}{" "}
          remaining
        </Button>
        {user.credits > 0 ? (
          <AddConsultationDialog />
        ) : (
          <Button variant={"secondary"} asChild>
            <Link href={"/pricing"}>Upgrade Plan</Link>
          </Button>
        )}
      </div>

      {sessions?.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sessions.map(({ sessionChat, user }) => (
            <SessionCard
              key={sessionChat.id}
              sessionChatId={sessionChat.sessionChatId}
              notes={sessionChat.notes || ""}
              selectedDoctor={sessionChat.selectedDoctor as DoctorType}
              conversation={sessionChat.conversation as SessionConversationType}
              report={sessionChat.report as SessionReportType}
              createdAt={sessionChat.createdAt}
              userImg={user?.image ?? ""}
              username={user?.name ?? "Guest"}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No sessions found."
          description="Try to consult with a new doctor."
        />
      )}

      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </main>
  );
};

export default SessionHistory;
