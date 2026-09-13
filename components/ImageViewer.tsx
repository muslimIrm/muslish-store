"use client";
import {
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
interface Props {
  images: Array<{
    asset?: SanityImageAssetReference;
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
}
const ImageViewer = ({ images = [] }: Props) => {
  console.log("images", images);
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-y-2 md:gap-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-h-137.5 min-h-112.5 border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            width={700}
            height={700}
            alt="Product Image"
            priority
            className={
              "w-full h-96 max-h-137.5 min-h-125 object-contain group-hover:scale-110 hoverEffect rounded-md"
            }
          />
        </motion.div>
      </AnimatePresence>
      <div className={"w-full h-20 md:h-28 grid grid-cols-6 gap-2"}>
        {images.map((image) => (
          <button
            key={image?._key}
            className={`border overflow-hidden rounded-md ${active?._key === image?._key ? " ring-1 ring-darkColor" : "border-darkColor/10"}`}
            onClick={() => setActive(image)}
          >
            <Image
              src={urlFor(image).url()}
              width={100}
              height={100}
              alt="Product Image"
              className={"w-full h-auto object-contain hoverEffect rounded-md"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
