// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslations, useLocale } from "next-intl";

// const menuItems = [
//   // { name: "Home", href: "/", key: "home" },
//   { name: "About", href: "/about", key: "about" },
//   { name: "Projects", href: "/projects", key: "projects" },
//   { name: "News & Media", href: "/news-media", key: "newsMedia" },
//   { name: "Careers", href: "/careers", key: "careers" },
//   { name: "Contact", href: "/contact", key: "contact" },
// ];

// export default function BurgerMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   const t = useTranslations("header");
//   const tNav = useTranslations("navigation");
//   const locale = useLocale();

//   // Close menu on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Burger Button */}
//       <motion.button
//         onClick={toggleMenu}
//         className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         aria-label="Toggle menu"
//       >
//         <span>{t("menu")}</span>
//         <div className="w-4 h-4 flex flex-col justify-center items-center">
//           <motion.span
//             className="block w-3 h-0.5 bg-white mb-0.5"
//             animate={{
//               rotate: isOpen ? 45 : 0,
//               y: isOpen ? 4 : 0,
//             }}
//             transition={{ duration: 0.3 }}
//           />
//           <motion.span
//             className="block w-3 h-0.5 bg-white"
//             animate={{
//               opacity: isOpen ? 0 : 1,
//             }}
//             transition={{ duration: 0.3 }}
//           />
//           <motion.span
//             className="block w-3 h-0.5 bg-white mt-0.5"
//             animate={{
//               rotate: isOpen ? -45 : 0,
//               y: isOpen ? -4 : 0,
//             }}
//             transition={{ duration: 0.3 }}
//           />
//         </div>
//       </motion.button>

//       {/* Fullscreen Menu Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40"
//             onClick={closeMenu}
//           >
//             {/* Background Image */}
//             <div
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
//               style={{
//                 backgroundImage: "url('/images/menu_bg.png')",
//               }}
//             />

//             {/* Menu Content */}
//             <div
//               className="relative z-10 h-screen flex bg-gray-50 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: "url('/images/menu_bg.png')",
//               }}
//             >
//               {/* Left Side Navigation */}
//               <div className="sm:w-1/2 lg:w-1/3 pl-16 lg:pl-48 pr-8 lg:pr-12 pt-8 lg:pt-20 pb-8 lg:pb-12 flex flex-col justify-start">
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3, delay: 0.1 }}
//                   className="mb-12"
//                 >
//                   <Link href="/" onClick={closeMenu}>
//                     <div className="mb-6">
//                       <Image
//                         src="/images/logo.svg"
//                         alt="YIGO"
//                         width={200}
//                         height={60}
//                         className="h-12 lg:h-16 w-auto"
//                       />
//                     </div>
//                   </Link>
//                   <div className="absolute left-0 w-2/5 h-px bg-black"></div>
//                 </motion.div>

//                 <motion.nav
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3, delay: 0.2 }}
//                   className="space-y-4"
//                 >
//                   {menuItems.map((item, index) => (
//                     <motion.div
//                       key={item.name}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{
//                         duration: 0.3,
//                         delay: 0.3 + index * 0.1,
//                       }}
//                     >
//                       <Link
//                         href={`/${locale}${item.href}`}
//                         onClick={closeMenu}
//                         className="block text-xl lg:text-2xl uppercase font-medium text-black hover:text-neutral-600 transition-colors duration-300"
//                       >
//                         {tNav(item.key)}
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </motion.nav>
//               </div>

//               {/* Right Side - Empty for background visibility */}
//               <div className="sm:w-1/2 lg:w-2/3"></div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { X } from "lucide-react"; // Import X icon

const menuItems = [
  // { name: "Home", href: "/", key: "home" },
  { name: "About", href: "/about", key: "about" },
  { name: "Projects", href: "/projects", key: "projects" },
  { name: "News & Media", href: "/news-media", key: "newsMedia" },
  { name: "Careers", href: "/careers", key: "careers" },
  { name: "Contact", href: "/contact", key: "contact" },
];

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Burger Button */}
      <motion.button
        onClick={toggleMenu}
        className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <span>{t("menu")}</span>
        <div className="w-4 h-4 flex flex-col justify-center items-center">
          <motion.span
            className="block w-3 h-0.5 bg-white mb-0.5"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-3 h-0.5 bg-white"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-3 h-0.5 bg-white mt-0.5"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            onClick={closeMenu}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
              style={{
                backgroundImage: "url('/images/menu_bg.png')",
              }}
            />

            {/* Close Button - Top Right */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={closeMenu}
              className="absolute top-8 right-8 lg:top-12 lg:right-16 z-50  text-black p-3 rounded-full cursor-pointer transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            {/* Menu Content */}
            <div
              className="relative z-10 h-screen flex bg-gray-50 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/menu_bg.png')",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking menu content
            >
              {/* Left Side Navigation */}
              <div className="sm:w-1/2 lg:w-1/3 pl-16 lg:pl-48 pr-8 lg:pr-12 pt-8 lg:pt-20 pb-8 lg:pb-12 flex flex-col justify-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-12"
                >
                  <Link href="/" onClick={closeMenu}>
                    <div className="mb-6">
                      <Image
                        src="/images/logo.svg"
                        alt="YIGO"
                        width={200}
                        height={60}
                        className="h-12 lg:h-16 w-auto"
                      />
                    </div>
                  </Link>
                  <div className="absolute left-0 w-2/5 h-px bg-black"></div>
                </motion.div>

                <motion.nav
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-4"
                >
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3 + index * 0.1,
                      }}
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={closeMenu}
                        className="block text-xl lg:text-2xl uppercase font-medium text-black hover:text-neutral-600 transition-colors duration-300"
                      >
                        {tNav(item.key)}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              {/* Right Side - Empty for background visibility */}
              <div className="sm:w-1/2 lg:w-2/3"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}