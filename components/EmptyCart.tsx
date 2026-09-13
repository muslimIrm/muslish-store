import Image from "next/image";
import React from "react";
import empty_cart_image from "@/images/empty_cart.jpg";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
const EmptyCart = () => {
  return (
    <div className="py-10 md:py-20 bg-linear-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="w-48 h-48 mx-auto relative"
        >
          <Image
            src={empty_cart_image}
            alt="Empty Cart Image"
            className=" object-contain"
            fill
          />
          <motion.div
            animate={{ x: [0, -10, 10, 0], y: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="bg-blue-500 absolute -right-4 -top-4 rounded-full p-2 "
          >
            <ShoppingCart className="text-white" size={24} />
          </motion.div>
        </motion.div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Your cart is feeling lonely
          </h2>
          <p className="text-gray-600">
            It looks like you haven&apos;t added anything to your cart yet.
            Let&apos;s change and find some amazing products for you!
          </p>
        </div>
        <Link
          href={"/"}
          className="bg-darkColor/5 text-center rounded-full border border-darkColor/20
                 block py-2.5  text-sm font-semibold hover:bg-darkColor hover:text-white hoverEffect tracking-wide"
        >
          Discover Product
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
