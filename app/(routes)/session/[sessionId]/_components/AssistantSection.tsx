import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AssistantSectionProps {
  user: UserType | null;
  sessionChat: SessionChatType;
  selectedDoctor: DoctorType;
}

const AssistantSection = ({
  user,
  sessionChat,
  selectedDoctor,
}: AssistantSectionProps) => {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-lg w-full min-h-80 bg-neutral-100/90 dark:bg-neutral-900/20 shadow-lg">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={selectedDoctor.image || "/empty-img.png"}
              alt={selectedDoctor.name}
              width={150}
              height={150}
              loading="lazy"
              blurDataURL="/blur.jpg"
              className="object-cover"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-center">
              {selectedDoctor.name}
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              {selectedDoctor.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-lg w-full min-h-80 bg-neutral-100/90 dark:bg-neutral-900/20 shadow-lg">
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={user.image || "/empty-img.png"}
                alt={user.name}
                width={150}
                height={150}
                loading="lazy"
                blurDataURL="/blur.jpg"
                className="object-cover"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-center">{user.name}</h2>
              <p className="text-sm text-muted-foreground text-center">
                {user.email}
              </p>
            </div>
          </div>
        </div>
        <Button className="cursor-pointer">Start Session</Button>
      </div>
    </section>
  );
};

export default AssistantSection;
