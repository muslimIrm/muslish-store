import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
interface Props {
  selectedTab: string;
  className?: string;
}
const NoProductsAvailable = ({ selectedTab, className }: Props) => {
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
        <h2 className="text-2xl text-gray-800 font-bold">
          No Products Available.
        </h2>
      </motion.div>
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We&apos;re sorry, but there are no products matching on{" "}
        <span className="text-darkColor text-base font-semibold">
          {selectedTab}
        </span>{" "}
        criteria at the moment.
      </motion.p>
      <motion.div
        className="flex gap-x-2 text-blue-600 items-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Loader2 className="h-4 w-4 animate-spin" /> We&apos;re restocking
        shortly.
      </motion.div>
      <motion.p
        className="text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Please check back later or explore our other product categories.
      </motion.p>
    </div>
  );
};

export default NoProductsAvailable;
