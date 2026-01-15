"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface FloorPlanGridProps {
  floorPlans: string[];
  title: string;
}

export default function FloorPlanGrid({
  floorPlans,
  title,
}: FloorPlanGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const open = useCallback((index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setActiveIndex((prev) => (prev + 1) % floorPlans.length);
      if (e.key === "ArrowLeft")
        setActiveIndex(
          (prev) => (prev - 1 + floorPlans.length) % floorPlans.length
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close, floorPlans.length]);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {floorPlans.map((plan, index) => (
          <button
            key={plan}
            type="button"
            onClick={() => open(index)}
            className="group relative w-full overflow-hidden border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={plan}
                alt={`${title} - Floor Plan ${index + 1}`}
                fill
                className="object-contain p-3 md:p-4 transition-transform duration-200 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-[92vw] h-[92vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl"
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={floorPlans[activeIndex]}
              alt={`${title} - Floor Plan ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            {floorPlans.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + floorPlans.length) % floorPlans.length
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % floorPlans.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
