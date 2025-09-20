"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { PointerHighlight } from "../ui/pointer-highlight";
import Link from "next/link";

export function Hero() {
  const images = [
    "https://i.ibb.co/3m0gVQ4Y/doctor6.png",
    "https://i.ibb.co/Z1VFxsV7/doctor5.png",
    "https://i.ibb.co/XkD3x6zr/doctor3.png",
    "https://i.ibb.co/0RVK6TJX/doctor7.png",
    "https://i.ibb.co/fzZF3NnY/doctor2.png",
    "https://i.ibb.co/PzfjDFRC/doctor1.png",
    "https://i.ibb.co/gbcxn4yT/doctor9.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/3m0gVQ4Y/doctor6.png",
    "https://i.ibb.co/Z1VFxsV7/doctor5.png",
    "https://i.ibb.co/XkD3x6zr/doctor3.png",
    "https://i.ibb.co/0RVK6TJX/doctor7.png",
    "https://i.ibb.co/fzZF3NnY/doctor2.png",
    "https://i.ibb.co/PzfjDFRC/doctor1.png",
    "https://i.ibb.co/gbcxn4yT/doctor9.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/3m0gVQ4Y/doctor6.png",
    "https://i.ibb.co/Z1VFxsV7/doctor5.png",
    "https://i.ibb.co/XkD3x6zr/doctor3.png",
    "https://i.ibb.co/0RVK6TJX/doctor7.png",
    "https://i.ibb.co/fzZF3NnY/doctor2.png",
    "https://i.ibb.co/PzfjDFRC/doctor1.png",
    "https://i.ibb.co/gbcxn4yT/doctor9.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/MDr4g84t/doctor10.png",
    "https://i.ibb.co/3m0gVQ4Y/doctor6.png",
  ];

  return (
    <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
      <div className="mx-auto z-20 max-w-4xl text-center text-2xl font-bold text-balance text-foreground md:text-4xl lg:text-6xl tracking-tight flex flex-col items-center">
        Where every health
        <PointerHighlight
          rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
          pointerClassName="text-primary"
        >
          <span className="relative z-10">idea finds its aid.</span>
        </PointerHighlight>
      </div>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-gray-500 dark:text-gray-200 md:text-base">
        Transforming your medical questions into clear, actionable answers.
        Aidea is your intelligent voice companion, offering the precise support
        you need, instantly.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href={"/dashboard"}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium transition-colors hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-black dark:focus:ring-offset-white cursor-pointer focus:outline-none min-w-40 max-w-40 text-center"
        >
          Get Your Aid
        </Link>
        <Link
          href={"/discover"}
          className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none min-w-40 max-w-40 text-center"
        >
          Discover Aidea
        </Link>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-white/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
