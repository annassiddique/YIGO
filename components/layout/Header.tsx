"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BurgerMenu from "./BurgerMenu";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHomePage =
    pathname === "/" || pathname === "/zh" || pathname === "/en";
  // const [skylineDone, setSkylineDone] = useState(!isHomePage);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      console.log("home page is", isHomePage);
      if (isHomePage) {
        console.log("isHomePage", isHomePage);
        const contentBelowHero = document.getElementById("content-below-hero");
        if (contentBelowHero) {
          const contentBelowHeroTop = contentBelowHero.offsetTop;
          console.log("contentBelowHeroTop", contentBelowHeroTop);

          // Only set isScrollingDown to true if scrolling down AND content-below-hero has been crossed
          if (
            currentScrollY > lastScrollY &&
            currentScrollY > contentBelowHeroTop &&
            currentScrollY > 100
          ) {
            setIsScrollingDown(true);
          } else {
            setIsScrollingDown(false);
          }
        } else {
          // Fallback if content-below-hero not found
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsScrollingDown(true);
          } else {
            setIsScrollingDown(false);
          }
        }
      } else {
        // For non-home pages, use the original logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsScrollingDown(true);
        } else {
          setIsScrollingDown(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isHomePage]);

  // Listen for skyline completion on home pages only
  // useEffect(() => {
  //   if (!isHomePage) return;
  //   const onCompleted = () => setSkylineDone(true);
  //   window.addEventListener("skyline:completed", onCompleted as EventListener);
  //   return () =>
  //     window.removeEventListener(
  //       "skyline:completed",
  //       onCompleted as EventListener
  //     );
  // }, [isHomePage]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative ">
        <div
          id="main-header"
          className={`grid grid-cols-3 items-center h-16 fixed left-0 px-4 sm:px-16 top-5 w-full z-30 duration-500 ${
            isScrollingDown ? "-translate-y-[100px]" : ""
          }`}
        >
          {/* Menu Button - Left side */}
          <div className="justify-self-start">
            <BurgerMenu />
          </div>

          {/* Logo - Center (no transform on ancestor) */}
          <Link
            href="/"
            className="justify-self-center md:w-[120px] md:h-[40px] w-[80px] h-[30px] flex items-center"
          >
            <Image
              id="logo"
              src="/images/logo.svg"
              alt="YIGO Logo"
              width={120}
              height={40}
              className="h-14 w-auto"
            />
          </Link>

          {/* Action Buttons - Right side */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* Request a Call Button */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black hidden sm:block text-white px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                {t("requestCall")}
              </motion.button>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/971501474794?text=Call%20me%20back%2C%20I%20am%20interested%20in%20one%20of%20your%20projects" // Replace with actual WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black hidden sm:flex items-center justify-center text-white w-10 h-10 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
