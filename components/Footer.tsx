import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./socialMedia";
import { categoriesData, quickLinksData } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={"border-t"}>
      <Container>
        <FooterTop />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div className="  flex flex-col gap-y-4">
            <Logo>Muslish</Logo>
            <p className="text-gray-600 text-sm">
              Discover curated furniture collections at Tulos, blending style
              and comfort to elevate your living spaces.
            </p>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-darkColor hover:text-darkColor"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <h3 className={"font-semibold text-darkColor mb-4"}>Quick Links</h3>
            <div className="flex flex-col gap-y-2">
              {quickLinksData?.map((item, index) => (
                <Link
                  href={item?.href}
                  key={index}
                  className={
                    "text-gray-600 text-sm font-medium hover:text-darkColor hoverEffect"
                  }
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className={"font-semibold text-darkColor mb-4"}>Categories</h3>
            <div className="flex flex-col gap-3">
              {categoriesData?.map((item, index) => (
                <Link
                  href={`/categories${item?.href}`}
                  key={index}
                  className={
                    "text-gray-600 text-sm font-medium hover:text-darkColor hoverEffect"
                  }
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className={"font-semibold text-darkColor mb-4"}>NewsLetter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <form className="flex flex-col gap-3">
              <input
                placeholder="Enter Your Email"
                required
                type={"email"}
                className={
                  "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-gray-200 rounded-lg focus:ring-2"
                }
              />
              <button
                type="submit"
                className="bg-darkColor text-white w-full rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
