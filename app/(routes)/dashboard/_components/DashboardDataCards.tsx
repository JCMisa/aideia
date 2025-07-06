import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getUserSessions } from "@/lib/actions/sessions";
import { getUserDashboardStats } from "@/lib/actions/users";

const DashboardDataCards = async () => {
  const consultations = await getUserSessions();
  const userStats = await getUserDashboardStats();

  const projects = [
    {
      title: "My Consultations",
      value: consultations.length || 0,
      description:
        "Track and manage all your Aidea consultations in one place. View your medical history, treatment plans, and ongoing care.",
      link: "/session/history",
    },
    {
      title: "Recent Activity",
      value: userStats.recentSessionsCount,
      description: `You've had ${userStats.recentSessionsCount} consultations in the last 7 days. Stay on top of your health with regular check-ins.`,
      link: "/session/history",
    },
    {
      title: "Top Specialist",
      value: userStats.topSpecialists[0]?.count || 0,
      description:
        userStats.topSpecialists.length > 0
          ? `You've consulted ${userStats.topSpecialists[0].name} ${userStats.topSpecialists[0].count} times. Your most trusted specialist for personalized care.`
          : "Start your first consultation to see your preferred specialists.",
      link: "/session/history",
    },
  ];

  return (
    <div className="w-full">
      <HoverEffect items={projects} />
    </div>
  );
};

export default DashboardDataCards;
