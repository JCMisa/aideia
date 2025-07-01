"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { useState, useCallback, useMemo, useTransition } from "react";
import axios from "axios";
import { toast } from "sonner";
import SuggestedDoctorCard from "./SuggestedDoctorCard";

const AddConsultationDialog = () => {
  const [note, setNote] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<
    SuggestedDoctorType[] | null
  >(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);

  // Debounced note update for better performance
  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setNote(value);
    },
    []
  );

  // Memoized validation to prevent unnecessary re-renders
  const isNoteValid = useMemo(() => {
    const trimmedNote = note.trim();
    return trimmedNote.length >= 10 && trimmedNote.length <= 1000;
  }, [note]);

  // Memoized character count
  const characterCount = useMemo(() => note.length, [note]);

  // Handle form submission with transition
  const handleNext = useCallback(() => {
    if (!isNoteValid) return;

    startTransition(async () => {
      try {
        // Show loading state immediately
        const result = await axios.post(
          "/api/suggest-doctors",
          {
            notes: note.trim(), // Trim whitespace for cleaner data
          },
          {
            timeout: 30000, // 30 second timeout before aborting api call
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle successful response
        if (result.status === 200 && result.data) {
          console.log("Result: ", result.data);

          setSuggestedDoctors(result.data);
          toast.success("Doctors suggested successfully!");

          // Close dialog and reset form immediately for better UX
          // setIsOpen(false);
          // setNote("");
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("API Error:", error);

        // Handle different types of errors
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            toast.error("Request timed out. Please try again.");
            console.error("Request timed out");
          } else if (error.response?.status === 400) {
            toast.error("Invalid input. Please check your notes.");
            console.error("Bad request:", error.response.data);
          } else if (error.response?.status === 500) {
            toast.error("Server error. Please try again later.");
            console.error("Server error:", error.response.data);
          } else {
            toast.error("An unexpected error occurred. Please try again.");
            console.error("Unexpected error:", error.message);
          }
        } else {
          toast.error("Network error. Please check your connection.");
          console.error("Network error:", error);
        }
      }
    });
  }, [note, isNoteValid]);

  const handleStartConsultation = useCallback(() => {
    if (!note.trim() || !selectedDoctor) {
      toast.error("Please provide notes and select a doctor.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await axios.post(
          "/api/session-chat",
          {
            notes: note.trim(),
            selectedDoctor,
          },
          { timeout: 30000, headers: { "Content-Type": "application/json" } }
        );

        if (result.status === 200 && result.data) {
          console.log("Session chat result: ", result.data);
          toast.success("Consultation started successfully!");

          // todo: route to conversation screen
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            toast.error("Request timed out. Please try again.");
          } else if (error.response?.status === 400) {
            toast.error(error.response.data?.error || "Invalid input.");
          } else if (error.response?.status === 401) {
            toast.error("You are not authorized. Please log in.");
          } else if (error.response?.status === 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        } else {
          toast.error("Network error. Please check your connection.");
        }
        console.error("Start Consultation Error:", error);
      }
    });
  }, [note, selectedDoctor]);

  // Handle dialog close and form reset
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setNote("");
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">+ New Consultation</Button>
      </DialogTrigger>
      <DialogContent
        className={`w-full ${
          suggestedDoctors &&
          "min-w-[70%] h-[40rem] md:h-auto overflow-y-auto custom-scrollbar"
        }`}
      >
        <DialogHeader>
          <DialogTitle>
            {!suggestedDoctors ? "Add Basic Details" : "Select Your Doctor"}
          </DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              // notes and patient symptoms
              <div className="flex flex-col gap-3 mt-2">
                <h2 className="text-sm text-muted-foreground">
                  Add symptoms or any other details
                </h2>
                <div className="relative">
                  <Textarea
                    placeholder="Describe your symptoms, concerns, or any relevant medical information..."
                    required
                    rows={5}
                    value={note}
                    onChange={handleNoteChange}
                    className="resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={1000}
                    disabled={isPending}
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>
                      {characterCount < 10 ? (
                        <span className="text-red-500">
                          Minimum 10 characters required
                        </span>
                      ) : (
                        <span className="text-green-500">
                          ✓ Minimum length met
                        </span>
                      )}
                    </span>
                    <span>{characterCount}/1000 characters</span>
                  </div>
                </div>
              </div>
            ) : (
              // suggested doctors here
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {suggestedDoctors &&
                  [...suggestedDoctors]
                    .sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0))
                    .map((doctor: SuggestedDoctorType) => (
                      <SuggestedDoctorCard
                        key={doctor.doctor.id}
                        doctor={doctor}
                        setSelectedDoctor={() =>
                          setSelectedDoctor(doctor.doctor)
                        }
                        selectedDoctor={selectedDoctor || null}
                      />
                    ))}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button
              className="cursor-pointer flex items-center gap-1"
              disabled={!isNoteValid || isPending}
              onClick={handleNext}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Next
                  <ArrowRightIcon className="size-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              className="cursor-pointer flex items-center gap-1"
              onClick={handleStartConsultation}
              disabled={isPending || !note || !selectedDoctor}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Start Consultation"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddConsultationDialog;
