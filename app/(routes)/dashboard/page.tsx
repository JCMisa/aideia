import DashboardDataCards from "./_components/DashboardDataCards";
import DoctorsList from "./_components/DoctorsList";
import { sampleConsultation } from "@/constants";
import { getCurrentUser } from "@/lib/actions/users";
import { redirect } from "next/navigation";
import ConsultationsList from "./_components/ConsultationsList";

const DashboardPage = async () => {
  const user: UserType = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <section className="w-full flex flex-col gap-4">
      <DashboardDataCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="w-full">
          <DoctorsList />
        </div>
        <div className="w-full flex flex-col gap-4">
          {/* consultations list */}
          <ConsultationsList
            user={user}
            consultationsList={sampleConsultation}
          />
          {/* chart */}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
