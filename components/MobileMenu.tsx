"use client";
import { AlignLeft } from "lucide-react";
import React from "react";
import SideBar from "./SideBar";

const MobileMenu = () => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
        <AlignLeft className={"hover:text-darkColor hoverEffect md:hidden"} />
      </button>
      <div>
        <SideBar
          isOpen={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;
