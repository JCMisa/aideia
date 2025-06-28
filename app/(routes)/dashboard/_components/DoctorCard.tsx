import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HeartIcon, LockKeyholeIcon } from "lucide-react";
import Image from "next/image";

const DoctorCard = ({ doctor }: { doctor: DoctorType }) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-md min-w-full h-[340px] border border-border transition-colors duration-300 relative">
      <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden no-scrollbar">
        {doctor.image ? (
          <Image
            className="object-cover w-full h-full"
            alt={doctor.name}
            src={doctor.image}
            width={320}
            height={160}
            priority={true}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <div className="w-full flex items-center mb-2">
        {!doctor.subscriptionRequired ? (
          <HeartIcon className="text-primary mr-2" />
        ) : (
          <LockKeyholeIcon className="text-muted-foreground mr-2" />
        )}
        <h3 className="font-semibold text-lg text-foreground line-clamp-1 md:line-clamp-3 lg:line-clamp-1 xl:line-clamp-3">
          {doctor.name} <Badge variant={"outline"}>{doctor.specialist}</Badge>
        </h3>
      </div>
      <p className="text-muted-foreground text-sm w-full line-clamp-1 md:line-clamp-3 lg:line-clamp-1 xl:line-clamp-3">
        {doctor.description}
      </p>
      <Button
        size={"sm"}
        variant={"outline"}
        className="absolute bottom-3 right-3 cursor-pointer flex items-center gap-1"
      >
        Start Consultation
        <ArrowRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export default DoctorCard;
