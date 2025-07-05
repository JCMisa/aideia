import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getUserSessions } from "@/lib/actions/sessions";

const DashboardDataCards = async () => {
  const consultations = await getUserSessions();
  const projects = [
    {
      title: "My Consultations",
      value: consultations.length || 0,
      description:
        "Track and manage all your Aidea consultations in one place. View your medical history, treatment plans, and ongoing care.",
      link: "/session/history",
    },
    {
      title: "Netflix",
      value: 0,
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      value: 0,
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
  ];

  return (
    <div className="w-full">
      <HoverEffect items={projects} />
    </div>
  );
};

export default DashboardDataCards;
