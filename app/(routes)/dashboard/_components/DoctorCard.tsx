import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import Image from "next/image";

const DoctorCard = ({
  name,
  specialization,
  image,
  description,
}: {
  name: string;
  specialization: string;
  image: string;
  description: string;
}) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-md min-w-full h-[340px] border border-border transition-colors duration-300 relative">
      <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden no-scrollbar">
        {image ? (
          <Image
            className="object-cover w-full h-full"
            alt={name}
            src={image}
            width={320}
            height={160}
            loading="eager"
            decoding="sync"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <div className="w-full flex items-center mb-2">
        <HeartIcon className="text-muted-foreground mr-2" />
        <h3 className="font-semibold text-lg text-foreground">{name}</h3>
      </div>
      <p className="text-muted-foreground text-sm w-full line-clamp-3">
        {description}
      </p>
      <Button
        size={"sm"}
        variant={"outline"}
        className="absolute bottom-3 right-3 cursor-pointer"
      >
        {specialization}
      </Button>
    </div>
  );
};

export default DoctorCard;
