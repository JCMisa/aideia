import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BackgroundLines } from "@/components/ui/background-lines";
import { samplePeople } from "@/constants";
import { SignIn } from "@clerk/nextjs";
import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SigninPage = () => {
  return (
    <section className="">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
          <Link
            className="absolute top-10 left-10 z-50 flex items-center gap-2"
            href="/"
          >
            <span className="sr-only">Home</span>
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <span className="text-2xl font-bold">Aidea</span>
          </Link>
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 absolute inset-0">
            <div className="flex flex-row items-center justify-center mb-10 w-full mt-14 lg:mt-0 md:hidden lg:flex">
              <AnimatedTooltip items={samplePeople} />
            </div>
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight block md:hidden lg:block -mt-14">
              Hear their Aidea difference.
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center block md:hidden xl:block">
              <QuoteIcon className="size-8 z-50" /> Before Aidea, I felt lost
              trying to understand my lab results and doctor&apos;s notes. It
              was overwhelming. But with Aidea, I just speak my question, and I
              get an incredibly clear, concise explanation right away. It&apos;s
              like having a brilliant medical assistant available 24/7. This app
              has given me so much peace of mind and the confidence to ask the
              right questions during my appointments. Truly life-changing aid!
            </p>
          </BackgroundLines>

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
              Ready to Reconnect with Aidea?
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sign in to access your health ideas and the aid you&apos;ve come
              to rely on.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl mt-40 md:mt-0">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
};

export default SigninPage;
