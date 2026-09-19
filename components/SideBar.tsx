"use client";
import { motion } from "motion/react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { quickLinksData } from "../constants/index";
import SocialMedia from "./socialMedia";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import { Category } from "@/sanity.types";
import { GetAllCategories } from "@/sanity/helpers/queries";
import { useEffect, useState } from "react";
import React from "react";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideBar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const outsideClickRef = useOutSideClick<HTMLDivElement>(onClose);
  let [categories, setCategories] = useState<Category[] | null>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = (await GetAllCategories()) ?? [];
        res && setCategories(res)
      } catch (e) {
        console.error("Failed to fetch categories in Header:", e);
        setCategories(null);
      }
    };
    fetchCategories()
  }, []);
  return (
    <div
      className={`fixed inset-y-0 z-50 left-0 bg-darkColor/50 w-full hoverEffect cursor-auto ${isOpen ? " translate-x-0" : "-translate-x-full"}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={outsideClickRef}
        transition={{ duration: 0.4, delay: 0.3 }}
        className={
          "bg-darkColor text-white/70 border-r-white min-w-72 max-w-96 h-full p-10 gap-6 flex flex-col"
        }
      >
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <Logo className="text-white">Muslish</Logo>
          </button>
          <button onClick={onClose} className="hover:text-red-500 hoverEffect">
            <X />
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-3.5 text-base tracking-wide font-semibold">
          {categories && categories.map((item) => (
            <Link
              key={item?.title}
              href={`/categories/${item?.slug?.current}`}
              onClick={onClose}
              className={`hover:text-white hoverEffect transition-all duration-300 ease-in-out group relative ${pathname === `/categories/${item?.slug?.current}` && "text-white"}`}
            >
              {item?.title}
            </Link>
          ))}
          {quickLinksData.map((item) => (
            <Link
              key={item?.title}
              href={item?.href}
              onClick={onClose}
              className={`hover:text-white  hoverEffect transition-all duration-300 ease-in-out group relative ${pathname === item?.href && "text-white"}`}
            >
              {item?.title}
            </Link>
          ))}
          <SocialMedia />
        </div>
      </motion.div>
    </div>
  );
};

export default SideBar;
