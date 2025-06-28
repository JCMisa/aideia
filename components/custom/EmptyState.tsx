"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: string;
  link?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
  link,
}: EmptyStateProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section className="flex flex-col items-center px-4 py-10 gap-6 rounded-2xl shadow-lg w-full">
      <figure className="bg-neutral-200 dark:bg-neutral-800 rounded-[20px] flex items-center justify-center size-20 relative">
        {!imageError ? (
          <Image
            src={icon}
            alt={`${title} icon`}
            width={46}
            height={46}
            priority={true}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="46px"
            className={`object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <Image
            src="/fallback-icon.svg"
            alt={`${title} icon`}
            width={46}
            height={46}
            priority={true}
            sizes="46px"
            className="object-contain"
          />
        )}
      </figure>
      <article className="flex flex-col items-center gap-1.5">
        <h1 className="text-2xl font-bold -tracking-[1px]">{title}</h1>
        <p className="text-sm font-normal text-muted-foreground -tracking-[0.5px]">
          {description}
        </p>
        {action && (
          <Button asChild className="mt-3">
            <Link href={link || ""}>{action}</Link>
          </Button>
        )}
      </article>
    </section>
  );
};

export default EmptyState;
