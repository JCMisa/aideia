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

const AddConsultationDialog = () => {
  const [note, setNote] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

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
  const handleSubmit = useCallback(() => {
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
          toast.success("Doctors suggested successfully!");

          // Close dialog and reset form immediately for better UX
          setIsOpen(false);
          setNote("");
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
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
          <Button
            className="cursor-pointer flex items-center gap-1"
            disabled={!isNoteValid || isPending}
            onClick={handleSubmit}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddConsultationDialog;
