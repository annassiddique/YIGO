import React from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/en" },
    { name: "About", href: "/en/about" },
    { name: "Projects", href: "/en/projects" },
    { name: "News & Media", href: "/en/news-media" },
    { name: "Careers", href: "/en/careers" },
    { name: "Contact", href: "/en/contact" },
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-[#DFD8CF] text-sm">SALES OFFICE</p>
              <div className="mt-3 space-y-2">
                <p className="text-[#DFD8CF] text-sm whitespace-pre-line">
                  905-906, Court tower{"\n"}Business Bay{"\n"}Dubai
                </p>
                <p className="text-[#DFD8CF] text-sm">
                  <a
                    href="mailto:Info@yigogroup.com"
                    className="hover:text-white transition-colors"
                  >
                    Info@yigogroup.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:items-center h-full">
            <a href="/">
              <img
                src="/public/images/YIGO-注册商标-QU-02.svg"
                className="w-36 brightness-0 invert"
              />
            </a>
          </div>

          <div className="space-y-6 col-span-2 md:col-span-1">
            <div className="text-right">
              <p className="sm:text-4xl text-3xl font-thin text-[#DFD8CF]">
                +971 50 147 4794
              </p>
            </div>
            <nav className="space-y-3 text-right text-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-[#DFD8CF] hover:text-white transition-colors font-thin"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-neutral-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-neutral-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-neutral-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[#DFD8CF] text-sm font-light">
              ©YIGO — 2025 ALL RIGHTS RESERVED
            </div>
            <div className="flex space-x-8 text-neutral-400 text-sm">
              <a
                href="/en/terms"
                className="hover:text-white transition-colors"
              >
                TERMS & CONDITIONS
              </a>
            </div>
            <div className="text-neutral-400 text-sm">MADE BY STELEO</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
