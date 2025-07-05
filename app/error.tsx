"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    // Optionally log error to an error reporting service
    console.error(error);
  }, [error]);

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="bg-card shadow-lg rounded-xl p-8 flex flex-col items-center max-w-md w-full">
        <div className="flex flex-col items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-destructive mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-destructive mb-1">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-center">
            Sorry, an unexpected error has occurred.
            <br />
            Please try again or return back to where you left.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 w-full">
          <Button
            className="w-full cursor-pointer"
            variant="default"
            onClick={() => router.back()}
          >
            Go Home
          </Button>
          <Button
            className="w-full cursor-pointer"
            variant="outline"
            onClick={handleReset}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
