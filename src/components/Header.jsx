/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ logoVisible }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      setMounted(true);
    } else if (mounted) {
      const timeout = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen, mounted]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 mx-0 md:mx-7 pt-4 md:pt-3 bg-transparent
          transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className=" mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            MENU <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <button className="hidden md:block bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors">
              REQUEST A CALL
            </button>
            <button className="px-3 py-1 text-sm font-medium rounded-full transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">
              中文
            </button>
            <button className="hidden md:block h-12 w-12 p-1">
              <img src="/public/images/whatsapp.png" alt="WhatsApp" />
            </button>
          </div>
        </div>
      </header>

      {(logoVisible || isMenuOpen) && (
        <div
          className={`fixed top-6 left-[35%] md:left-[46%] transition-transform duration-300 z-60 ${
            isVisible ? "translate-y-0" : "-translate-y-[160%]"
          } ${isMenuOpen ? "hidden sm:block" : ""}`}
        >
          <img src="/public/images/YIGO-注册商标-QU-02.svg" className="w-32" />
        </div>
      )}

      {mounted && (
        <div
          className={`fixed inset-0 z-50 flex bg-gray-50 bg-cover bg-center bg-no-repeat
      transition-opacity duration-500
      ${isMenuOpen ? "opacity-100" : "opacity-0"}
    `}
          style={{
            backgroundImage: "url('https://yigogroup.ae/images/menu_bg.png')",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
        >
          <div
            className="w-full sm:w-1/2 lg:w-1/3 pl-8 sm:pl-16 lg:pl-48 pr-8 lg:pr-12 pt-8 lg:pt-20 pb-8 lg:pb-12 flex flex-col justify-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-12">
              <a href="/">
                <div className="mb-6">
                  <img
                    src="/public/images/YIGO-注册商标-QU-02.svg"
                    alt="YIGO"
                    className="h-12 lg:h-16 w-auto"
                  />
                </div>
              </a>
              <div className="absolute left-0 w-2/5 h-px bg-black"></div>
            </div>

            <nav className="space-y-4">
              {[
                { label: "About", href: "about" },
                { label: "Projects", href: "projects" },
                { label: "News & Media", href: "news-media" },
                { label: "Careers", href: "careers" },
                { label: "Contact", href: "contact" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="
      block text-xl lg:text-2xl uppercase font-medium text-black
      hover:text-neutral-600 transition-colors duration-300
      opacity-0 -translate-x-5
      animate-[menuItemIn_0.5s_ease-out_forwards]
    "
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div
            className="hidden sm:block sm:w-1/2 lg:w-2/3"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default Header;
