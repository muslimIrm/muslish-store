import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import { Gift, Circle, Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialMediaProps {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialMediaLink = [
  {
    title: "youtube",
    icons: <Circle className={"w-5 h-5"} />,
    link: "youtube.com",
  },
  {
    title: "github",
    icons: <Box className={"w-5 h-5"} />,
    link: "github.com",
  },
  {
    title: "FaceBook",
    icons: <Gift className={"w-5 h-5"} />,
    link: "facebook.com",
  },
];

const SocialMedia = ({
  className,
  iconClassName,
  tooltipClassName,
}: SocialMediaProps) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3", className)}>
        {socialMediaLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger className={"border rounded-full p-2 group"}>
              <Link rel={"noopener noreferrer"} href={item.link} className={cn(" group-hover:text-white group-hover:border-white hoverEffect", iconClassName)}>
                {item.icons}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold",
                tooltipClassName,
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
