"use client";

import React from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

type HeroProps = {
  title: string;
  // subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  overlayOpacity?: number; // 0 to 1
  className?: string;
  heightClassName?: string; // e.g. h-[60vh]
  children?: React.ReactNode;
};

export default function Hero({
  title,
  // subtitle,
  imageSrc,
  imageAlt,
  overlayOpacity = 0.4,
  className,
  heightClassName = "h-[60vh]",
  children,
}: HeroProps) {
  const overlay = Math.min(Math.max(overlayOpacity, 0), 1);

  return (
    <section
      className={`relative ${heightClassName} overflow-hidden ${
        className ?? ""
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt ?? title}
        fill
        className="object-cover"
        priority
      />
      <div
        className={`absolute inset-0`}
        style={{ backgroundColor: "rgba(0,0,0," + overlay + ")" }}
      />

      {/* Content aligned to left per design */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-left text-white max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-widest uppercase mb-3">
                {title}
              </h1>
            </FadeIn>
            {children && <div className="mt-4">{children}</div>}
            {/* {subtitle && (
              <FadeIn delay={0.15} y={20}>
                <p className="text-lg sm:text-xl text-neutral-200">
                  {subtitle}
                </p>
              </FadeIn>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
