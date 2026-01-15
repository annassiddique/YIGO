"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { projects } from "@/lib/data/projects";
import { useLocale } from "next-intl";

interface ProjectCarouselProps {
  className?: string;
}

// A center-focused carousel with layered cards similar to the provided layout.
// - Keyboard and button navigation
// - Click on the active item opens the project detail page
// - Uses only Framer Motion for smooth transforms
export default function ProjectCarousel({ className }: ProjectCarouselProps) {
  const initialIndex = Math.floor(projects.length / 2);
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const router = useRouter();
  const swiperRef = React.useRef<SwiperType | null>(null);
  const locale = useLocale();

  return (
    <div className={"w-full px-0 sm:px-4 md:px-6 lg:px-8" + (className ?? "")}>
      <div className="relative mx-auto w-full pb-20 px-0 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative select-none">
          <Swiper
            modules={[EffectCoverflow, Navigation, Keyboard, Mousewheel]}
            effect="coverflow"
            initialSlide={initialIndex}
            coverflowEffect={{
              rotate: 0,
              stretch: -20,
              depth: 160,
              modifier: 1.1,
              slideShadows: false,
            }}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={0}
            keyboard={{ enabled: true }}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            grabCursor
            navigation={{ prevEl: ".proj-prev", nextEl: ".proj-next" }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!overflow-visible"
          >
            {projects.map((project, index) => (
              <SwiperSlide
                key={project.slug}
                className="!w-[220px] !h-[300px] md:!w-[320px] md:!h-[420px] lg:!w-[360px] lg:!h-[500px]"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (index === activeIndex) {
                      router.push(`/projects/${project.slug}`);
                    } else {
                      swiperRef.current?.slideTo(index);
                    }
                  }}
                  className={`group relative block h-full w-full overflow-hidden bg-neutral-200 shadow-xl ${
                    index === activeIndex
                      ? "shadow-2xl ring-0 ring-black/50"
                      : "ring-0"
                  }`}
                  aria-label={
                    index === activeIndex
                      ? `Open ${project.title}`
                      : `Slide ${index + 1}`
                  }
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 600px, 800px"
                    priority={index === activeIndex}
                  />
                  {/* Bottom caption */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative flex items-end justify-center pb-4">
                      <span className="font-heading px-4 py-1.5 text-base md:text-lg lg:text-2xl font-normal text-white text-center">
                        {locale === "zh" ? project.titleZh : project.title}
                      </span>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))}

            {/* Spacer to give room at bottom for nav/dots if needed */}
            <div className="h-4" />
          </Swiper>

          {/* Controls */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-between">
            <button
              type="button"
              className="proj-prev pointer-events-auto inline-flex items-center justify-center text-white hover:opacity-80 z-50"
              aria-label="Previous project"
            >
              <span className="sr-only">Previous</span>
              <svg
                width="76"
                height="76"
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
              className="proj-next pointer-events-auto inline-flex items-center justify-center text-white hover:opacity-80 z-50"
              aria-label="Next project"
            >
              <span className="sr-only">Next</span>
              <svg
                width="76"
                height="76"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
              >
                <path d="M9 18l6-6-6-6" strokeWidth="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
