import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHeader } from "../context/HeaderContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = ({ showLogo = false }) => {
  const { logoVisible } = useHeader();
  const { t } = useTranslation('common');
  const { lang } = useParams();
  const currentLang = lang || 'en';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const shouldShowLogo = showLogo || logoVisible;

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

  const navItems = [
    { label: t('nav.about'), href: `/${currentLang}/about` },
    { label: t('nav.projects'), href: `/${currentLang}/projects` },
    { label: t('nav.newsMedia'), href: `/${currentLang}/news-media` },
    { label: t('nav.careers'), href: `/${currentLang}/careers` },
    { label: t('nav.contact'), href: `/${currentLang}/contact` },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 mx-0 md:mx-7 pt-4 md:pt-3 bg-transparent
          transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            {t('buttons.menu')} <Menu className="w-4 h-4" />
          </button>

          {shouldShowLogo && (
            <div
              className={`fixed top-6 left-[35%] md:left-[43%] transition-transform duration-300 z-60 ${
                isVisible ? "translate-y-0" : "-translate-y-[160%]"
              } ${isMenuOpen ? "hidden sm:block" : ""}`}
            >
              <Link to={`/${currentLang}`}>
                <img
                  src="https://yigogroup.ae/images/logo.svg"
                  className="w-32"
                  alt="YIGO Logo"
                />
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button className="hidden md:block bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors">
              {t('buttons.requestCall')}
            </button>
            <LanguageSwitcher />
            <button className="hidden md:block h-12 w-12 p-1">
              <img src="/images/whatsapp.png" alt="WhatsApp" />
            </button>
          </div>
        </div>
      </header>

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
              <Link to={`/${currentLang}`} onClick={() => setIsMenuOpen(false)}>
                <div className="mb-6">
                  <img
                    src="/images/YIGO-注册商标-QU-02.svg"
                    alt="YIGO"
                    className="h-12 lg:h-16 w-auto"
                  />
                </div>
              </Link>
              <div className="absolute left-0 w-2/5 h-px bg-black"></div>
            </div>

            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
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