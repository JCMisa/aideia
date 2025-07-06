"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const PricingPage = () => {
  const theme = useTheme();

  return (
    <main className="w-full h-full items-center justify-center overflow-hidden lg:-mt-20">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(100%_100%_at_center,white,transparent)] absolute inset-0 -z-5"
        )}
      />

      {/* Add the glow effect div */}
      <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-primary/30 via-primary/5 to-transparent blur-[100px] -z-5"></div>

      <div className="py-20 md:px-20 lg:px-20 relative w-full">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="text-primary" data-aos="fade-down">
              Pricing Plans
            </h3>
            <h2 className=" text-[30px] font-bold" data-aos="fade-down">
              Choose Your Perfect Package
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              data-aos="fade-down"
            >
              Discover flexible pricing options tailored to your healthcare
              journey. From single consultations to comprehensive care packages,
              find the perfect plan that fits your needs and budget.
            </p>
          </div>

          <div style={{ margin: "0 auto", padding: "0 1rem" }}>
            <PricingTable
              appearance={{
                baseTheme: theme.theme === "dark" ? dark : undefined,
              }}
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 mb-2">Need help choosing a plan?</p>
            <a
              href="mailto:johncarlomisa399@gmail.com"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;
