"use client";

import { Button } from "@/components/ui/button";
import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";
import { MicIcon, MicOffIcon, LoaderCircleIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface AssistantSectionProps {
  user: UserType | null;
  sessionChat: SessionChatType;
  selectedDoctor: DoctorType;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const AssistantSection = ({
  user,
  sessionChat,
  selectedDoctor,
}: AssistantSectionProps) => {
  const router = useRouter();

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  const generateReport = useCallback(async () => {
    try {
      const result = await axios.post("/api/medical-report", {
        messages: messages,
        sessionDetail: sessionChat,
        selectedDoctor: selectedDoctor,
      });

      if (result.status === 200) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to generate report:", error);
    }
  }, [messages, sessionChat, selectedDoctor]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);
      setIsGeneratingReport(true);
      try {
        const result = await generateReport();

        if (result !== null) {
          console.log("Generated Report onCallEnd: ", result);
          toast.success("Report generated successfully!");
          // todo: router push to a summary and report page
        } else {
          toast.error("There is not report generated.");
        }
      } catch (error) {
        console.error("Failed to generate report on call end:", error);
        toast.error("Failed to generate report. Please try again.");
      } finally {
        setIsGeneratingReport(false);
      }
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);

    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error: ", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [router, user?.clerkId, generateReport]);

  // to capture voice through mic
  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const doctorName = selectedDoctor.name;
    const doctorDescription = selectedDoctor.description;
    const doctorPrompt = selectedDoctor.agentPrompt;
    const doctorSpeciality = selectedDoctor.specialist;
    const doctorVoice = selectedDoctor.voiceId;
    const topic = sessionChat.notes;
    const assistantOverrides = {
      variableValues: {
        doctorName,
        doctorDescription,
        doctorPrompt,
        doctorSpeciality,
        doctorVoice,
        topic,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    const assistantConfig = configureAssistant(doctorVoice);

    console.log("Assesitant Config: ", assistantConfig);

    // @ts-expect-error - assistantOverrides error
    vapi.start(assistantConfig, assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      {isGeneratingReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-50 z-50">
          <div className="p-6 rounded-lg flex flex-col items-center">
            <LoaderCircleIcon className="animate-spin w-10 h-10 mb-2 text-primary" />
            <p className="text-lg font-semibold">Generating your report...</p>
          </div>
        </div>
      )}
      <section className="flex flex-col h-[70vh] mt-3">
        <section className="flex gap-8 max-sm:flex-col max-sm:gap-12 mt-3">
          <div className="bg-neutral-100/80 dark:bg-neutral-900/20 w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center rounded-lg shadow-lg">
            <div className="size-[300px] flex items-center justify-center rounded-lg max-sm:size-[100px] -mt-4">
              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                  callStatus === CallStatus.CONNECTING &&
                    "opacity-100 animate-pulse"
                )}
              >
                <Image
                  src={selectedDoctor.image || "/empty-img.png"}
                  alt={selectedDoctor.specialist}
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 80px, 150px"
                  loading="lazy"
                  blurDataURL="/blur.jpg"
                  className="rounded-full object-cover w-[150px] h-[150px] max-sm:w-[80px] max-sm:h-[80px]"
                />
              </div>

              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  className="companion-lottie"
                />
              </div>
            </div>
            <p className="font-bold text-2xl max-sm:opacity-0">
              {selectedDoctor.name}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-1/3 max-sm:w-full max-sm:flex-row">
            <div className="border-2 border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 items-center rounded-lg py-8 max-sm:hidden">
              <Image
                src={user?.image || "/empty-img.png"}
                alt={user?.name || "Unknown"}
                width={150}
                height={150}
                loading="lazy"
                blurDataURL="/blur.jpg"
                placeholder="blur"
                sizes="(max-width: 640px) 80px, 150px"
                className="rounded-full object-cover w-[150px] h-[150px] max-sm:w-[80px] max-sm:h-[80px]"
                priority={false}
              />
              <p className="font-bold text-2xl">{user?.name || "Unknown"}</p>
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
              <Button
                variant={"outline"}
                className="flex gap-2 items-center cursor-pointer w-full"
                onClick={toggleMicrophone}
                disabled={callStatus !== CallStatus.ACTIVE}
              >
                {isMuted ? (
                  <MicOffIcon width={36} height={36} />
                ) : (
                  <MicIcon width={36} height={36} />
                )}
                <p className="max-sm:hidden">
                  {isMuted ? "Turn on microphone" : "Turn off microphone"}
                </p>
              </Button>
              <Button
                variant={
                  callStatus === CallStatus.ACTIVE ? "destructive" : "default"
                }
                className={cn(
                  "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
                  callStatus === CallStatus.CONNECTING && "animate-pulse"
                )}
                onClick={
                  callStatus === CallStatus.ACTIVE
                    ? handleDisconnect
                    : handleCall
                }
              >
                {callStatus === CallStatus.ACTIVE
                  ? "End Session"
                  : callStatus === CallStatus.CONNECTING
                  ? "Connecting"
                  : "Start Session"}
              </Button>
            </div>
          </div>
        </section>

        <section className="transcript">
          <div className="transcript-message no-scrollbar pb-24">
            {messages.map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <p key={index} className="max-sm:text-sm">
                    {selectedDoctor.name}: {message.content}
                  </p>
                );
              } else {
                return (
                  <p key={index} className="text-primary max-sm:text-sm">
                    {user?.name || "Unknown"}: {message.content}
                  </p>
                );
              }
            })}
          </div>

          <div className="transcript-fade" />
        </section>
      </section>
    </>
  );
};

export default AssistantSection;
