import { sampleDoctors } from "@/constants";
import DoctorCard from "./DoctorCard";

const DoctorsList = () => {
  return (
    <div className="relative overflow-hidden w-full h-full space-y-4">
      <h1 className="text-4xl font-bold">Doctors Agents List</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[60rem] overflow-y-auto no-scrollbar pb-20">
        {sampleDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>
    </div>
  );
};

export default DoctorsList;
