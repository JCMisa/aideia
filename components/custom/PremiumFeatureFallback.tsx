import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const PremiumFeatureFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] dark:from-[var(--background)] dark:to-[var(--card)] rounded-lg">
    <div className="max-w-md mx-auto text-center p-8">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-700)] rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[var(--primary-foreground)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
        <p className="text-[var(--muted-foreground)] mb-6">
          This detailed medical report is available exclusively to Health
          Essentials and Premium Care subscribers.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg p-4 border border-[var(--border)] dark:border-[var(--border)]">
          <h3 className="font-semibold mb-2">
            What&apos;s included in your subscription:
          </h3>
          <ul className="text-sm text-[var(--muted-foreground)] space-y-2 text-left">
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Detailed medical reports and analysis
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Comprehensive treatment plans
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Medication recommendations
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Priority access to specialists
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-[var(--primary-foreground)] bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] rounded-lg hover:from-[var(--primary-700)] hover:to-[var(--primary-800)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-500)] transition-all duration-200"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <Link
          href={"/pricing"}
          className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-[var(--primary-700)] bg-[var(--primary-50)] dark:bg-[var(--primary-900)] dark:text-[var(--primary-200)] rounded-lg hover:bg-[var(--primary-100)] dark:hover:bg-[var(--primary-800)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-500)] transition-all duration-200"
        >
          Upgrade Your Plan
        </Link>
      </div>

      <p className="text-xs text-[var(--muted-foreground)] mt-6">
        Already have a subscription? Please contact support if you&#39;re
        experiencing issues.
      </p>
    </div>
  </div>
);

export default PremiumFeatureFallback;
