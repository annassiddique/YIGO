"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";
import type { SwiperRef } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ImageSlider({
  images,
  alt,
  className = "",
}: ImageSliderProps) {
  const swiperRef = useRef<SwiperRef | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative group ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay, FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        autoplay={{
          delay: 0,
        }}
        loop={true}
        speed={5000}
        direction="horizontal"
        allowTouchMove={true}
        grabCursor={true}
        className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden continuous-scroll"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <div className="relative h-full">
              <Image
                src={image}
                alt={`${alt} - Image ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-auto object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .continuous-scroll > .swiper-wrapper {
          transition-timing-function: linear;
        }

        .swiper-pagination {
          position: static !important;
          margin-top: 1.5rem;
        }

        .swiper-pagination-bullet-custom {
          width: 12px !important;
          height: 12px !important;
          background: #d4d4d8 !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          transition: all 0.2s ease !important;
        }

        .swiper-pagination-bullet-active-custom {
          background: #171717 !important;
        }

        .swiper-pagination-bullet-custom:hover {
          background: #a3a3a3 !important;
        }

        /* Continuous scroll animation */
        .continuous-scroll .swiper-wrapper {
          animation: continuousScroll 20s linear infinite;
        }

        // .continuous-scroll:hover .swiper-wrapper {
        //   animation-play-state: paused;
        // }

        @keyframes continuousScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
