import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontalIcon } from "lucide-react";

const SuggestedDoctorCard = ({
  doctor,
  setSelectedDoctor,
  selectedDoctor,
}: {
  doctor: SuggestedDoctorType;
  setSelectedDoctor: (doctor: DoctorType) => void;
  selectedDoctor: DoctorType | null;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center border rounded-2xl shadow p-3 cursor-pointer hover:border-primary transition-colors ${
        selectedDoctor?.id === doctor.doctor.id && "border-primary"
      }`}
      onClick={() => setSelectedDoctor(doctor.doctor)}
    >
      <Image
        src={doctor.doctor.image || "/empty-img.png"}
        alt={doctor.doctor.specialist}
        width={70}
        height={70}
        className="w-[50px] h-[50px] rounded-4xl object-cover"
      />
      <h2 className="font-bold text-sm text-center">
        {doctor.doctor.specialist}
      </h2>
      <p className="text-xs line-clamp-2">{doctor.doctor.description}</p>
      <Popover>
        <PopoverTrigger className="cursor-pointer flex justify-end w-full">
          <MoreHorizontalIcon />
        </PopoverTrigger>
        <PopoverContent>{doctor.reason}</PopoverContent>
      </Popover>
    </div>
  );
};

export default SuggestedDoctorCard;
