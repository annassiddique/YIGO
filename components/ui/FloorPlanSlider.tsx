"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface FloorPlanSliderProps {
  floorPlans: string[];
  title: string;
}

export default function FloorPlanSlider({
  floorPlans,
  title,
}: FloorPlanSliderProps) {
  if (!floorPlans || floorPlans.length === 0) return null;

  return (
    <div className="mt-8 relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={16}
        pagination={{ clickable: true, el: ".floor-swiper-pagination" }}
        navigation={{ prevEl: ".floor-prev", nextEl: ".floor-next" }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1, spaceBetween: 16 },
          1024: { slidesPerView: 1, spaceBetween: 24 },
        }}
        className="w-full"
      >
        {floorPlans.map((plan, index) => (
          <SwiperSlide key={plan}>
            <div className="relative aspect-[2/1] w-full">
              <Image
                src={plan}
                alt={`${title} - Floor Plan ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-3 md:p-4"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-between">
        <button
          type="button"
          className="floor-prev pointer-events-auto inline-flex items-center justify-center text-white hover:opacity-80"
          aria-label="Previous floor plan"
        >
          <span className="sr-only">Previous</span>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          >
            <path d="M15 18l-6-6 6-6" strokeWidth="1" />
          </svg>
        </button>
        <button
          type="button"
          className="floor-next pointer-events-auto inline-flex items-center justify-center text-white hover:opacity-80"
          aria-label="Next floor plan"
        >
          <span className="sr-only">Next</span>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          >
            <path d="M9 18l6-6-6-6" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <div className="floor-swiper-pagination flex justify-center space-x-2"></div>
      </div>

      {/* Custom Styles to match project */}
      <style jsx global>{`
        .floor-swiper-pagination .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: #9aa0a6 !important;
          opacity: 1 !important;
          margin: 0 4px !important;
        }
        .floor-swiper-pagination .swiper-pagination-bullet-active {
          background: #3c4043 !important;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
