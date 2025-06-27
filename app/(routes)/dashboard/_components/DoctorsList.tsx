import { sampleDoctors } from "@/constants";
import DoctorCard from "./DoctorCard";

const DoctorsList = () => {
  return (
    <div className="relative overflow-hidden w-full h-full space-y-4">
      <h1 className="text-4xl font-bold">Doctors List</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sampleDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialization={doctor.specialization}
            image={doctor.image}
            description={doctor.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
