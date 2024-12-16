"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className=" rounded-lg p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Error:</strong>{" "}
          {error.message || "An unexpected error occurred."}
        </p>
        <p className="text-gray-500 text-sm mb-6">
          If the issue persists, please contact support.
        </p>
        <Button
          onClick={() => reset()} // Attempt to recover by trying to re-render the segment
          className="px-6 py-2   font-medium rounded-lg "
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
