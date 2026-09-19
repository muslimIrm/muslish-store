import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  onRetry: () => void;
  className?: string;
  errorMessage?: string;
}

const ErrorFetchingProducts = ({ onRetry, className, errorMessage }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 w-full rounded-lg mt-10",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-2" />
        <h2 className="text-2xl text-gray-800 font-bold">
          Something Went Wrong.
        </h2>
      </motion.div>

      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {errorMessage ||
          "We couldn't load the products. Please try again."}
      </motion.p>

      <motion.button
        onClick={onRetry}
        className="flex gap-x-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw className="h-4 w-4" />
        Retry
      </motion.button>

      <motion.p
        className="text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        If the problem persists, please contact support.
      </motion.p>
    </div>
  );
};

export default ErrorFetchingProducts;