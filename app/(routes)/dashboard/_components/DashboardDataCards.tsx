import { HoverEffect } from "@/components/ui/card-hover-effect";

const DashboardDataCards = () => {
  const projects = [
    {
      title: "Consultations",
      value: 0,
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
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
