import React from "react";
import { cn } from "@/lib/utils";
interface Props {
  children: React.ReactNode;
  className?: string;
}
const Title = ({className, children}: Props) => {
  return (
    <div>
      <h2
        className={cn(
          "text-2xl font-semibold",
          className,
        )}
      >
        {children}
      </h2>
    </div>
  );
};

export default Title;
