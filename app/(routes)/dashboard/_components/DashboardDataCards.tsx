import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  getAvgConsultationsPerWeek,
  getCurrentStreakWeeks,
} from "@/lib/actions/users";

const DashboardDataCards = async ({
  consultations,
}: {
  consultations: SessionChatType[];
}) => {
  const [avgPerWeek, streakWeeks] = await Promise.all([
    getAvgConsultationsPerWeek(),
    getCurrentStreakWeeks(),
  ]);

  const projects = [
    {
      title: "My Consultations",
      value: consultations.length,
      description:
        "Track and manage all your Aidea consultations in one place. View your medical history, treatment plans, and ongoing care.",
      link: "/session/history",
    },
    {
      title: "Weekly Average",
      value: avgPerWeek,
      description: `On average you schedule ${avgPerWeek} consultations every week. Keep it up for consistent health check-ups!`,
      link: "/dashboard",
    },
    {
      title: "Current Streak",
      value: `${streakWeeks} week${streakWeeks === 1 ? "" : "s"}`,
      description:
        streakWeeks > 0
          ? `You've had at least one consultation every week for the last ${streakWeeks} weeks. Great consistency!`
          : "Start a consultation this week to begin your streak.",
      link: "/dashboard",
    },
  ];

  return (
    <div className="w-full">
      <HoverEffect items={projects} />
    </div>
  );
};

export default DashboardDataCards;
