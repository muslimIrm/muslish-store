import { ProductType } from "@/constants";
import { Repeat } from "lucide-react";
import React from "react";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}
const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div
      className={
        "flex items-center justify-center gap-1.5 text-sm font-semibold w-full"
      }
    >
      <div className="flex items-center justify-center gap-1.5 w-full flex-wrap">
        {ProductType?.map((item) => (
          <button
            key={item?.title}
            onClick={() => onTabSelect(item?.title)}
            className={`border
             border-darkColor 
             px-4 py-1.5 
             md:px-6 md:py-2 
             hover:text-white hover:bg-darkColor 
             rounded-full 
             hoverEffect 
             cursor-pointer
             ${selectedTab === item?.title && "bg-darkColor text-white"}`}
          >
            {item?.title}
          </button>
        ))}
        <button
          className="border
             border-darkColor 
             p-2 
             hover:text-white hover:bg-darkColor 
             rounded-full 
             hoverEffect 
             cursor-pointer"
        >
          <Repeat className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HomeTabbar;
