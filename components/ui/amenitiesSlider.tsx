"use client";

import React, { useEffect } from "react";
import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade, Mousewheel } from "swiper/modules";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AmenitiesSlider = () => {
  const t = useTranslations("slides");

  useEffect(() => {
    // Wait for other ScrollTriggers to be ready and DOM to be stable
    const timer = setTimeout(() => {
      const sections = gsap.utils.toArray(".panel");

      if (sections.length === 0) return;

      // Create a more specific ScrollTrigger instance
      const horizontalScrollTrigger = ScrollTrigger.create({
        trigger: ".horizontal-wrapper",
        start: "top top",
        end: "+=4000",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1, // Lower priority to avoid conflicts
        onUpdate: (self) => {
          const progress = self.progress;
          const xPercent = -100 * (sections.length - 1) * progress;
          gsap.set(sections, { xPercent });
        },
        onRefresh: () => {
          // Ensure proper positioning after refresh
          gsap.set(sections, { xPercent: 0 });
        },
      });

      // Refresh ScrollTrigger to recalculate positions after a short delay
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);

      return () => {
        horizontalScrollTrigger.kill();
      };
    }, 200); // Increased delay to ensure other ScrollTriggers are ready

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const slides = [
    {
      id: 1,
      title: t("amenities.title"),
      subtitle: t("amenities.subtitle"),
      description: t("amenities.description"),
      features: [
        t("amenities.features.0"),
        t("amenities.features.1"),
        t("amenities.features.2"),
      ],
      images: ["/images/wellness_zone.webp", "/images/lobby.webp", "/images/pool.webp"],
      imageTitles: [
        t("amenities.imageTitles.0"),
        t("amenities.imageTitles.1"),
        t("amenities.imageTitles.2"),
      ],
    },
    {
      id: 2,
      title: t("urbanLiving.title"),
      subtitle: t("urbanLiving.subtitle"),
      description: t("urbanLiving.description"),
      features: [
        t("urbanLiving.features.0"),
        t("urbanLiving.features.1"),
        t("urbanLiving.features.2"),
      ],
      images: ["/images/urban_living.webp", "/images/urban_living_2.webp"],
      imageTitles: [
        t("urbanLiving.imageTitles.0"),
        t("urbanLiving.imageTitles.1"),
      ],
    },
    {
      id: 3,
      title: t("interiors.title"),
      subtitle: t("interiors.subtitle"),
      description: t("interiors.description"),
      features: [
        t("interiors.features.0"),
        t("interiors.features.1"),
        t("interiors.features.2"),
      ],
      images: ["/images/interiors.webp", "/images/interiors_2.webp"],
      imageTitles: [t("interiors.imageTitles.0"), t("interiors.imageTitles.1")],
    },
  ];

  return (
    <section className="horizontal-section relative h-[620vh] w-full overflow-hidden">
      <div className="horizontal-wrapper flex h-screen w-[300vw]">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="panel relative h-full w-full bg-red-500"
          >
            {/* White Background for Left Side */}
            <div className="absolute inset-0 bg-white" />

            {/* Content Layout */}
            <div className="relative z-10 h-full flex flex-col md:flex-row">
              {/* Left Side - Text Content (2/3 width) */}
              <div className="w-full md:w-1/2 h-full flex flex-col p-5 lg:p-8 xl:p-10">
                {/* Left Column - Big Title */}
                <div className="md:w-1/2 flex flex-col justify-start">
                  <h2 className="sm:text-nowrap font-heading uppercase text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 tracking-tight leading-tight">
                    {slide.title}
                  </h2>
                </div>

                {/* Right Column - Subtitle and Description (closer to image grid) */}
                <div className="border-t border-black/20 pt-6 md:w-1/2 flex flex-col justify-end self-end justify-self-end mt-auto">
                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-5 tracking-wide leading-tight">
                    {slide.subtitle === t("amenities.subtitle") ? (
                      <>
                        Wellness at Your
                        <br />
                        Doorstep
                      </>
                    ) : (
                      slide.subtitle
                    )}
                  </h3>
                  <p className="text-base font-light text-gray-600 max-w-lg leading-snug mb-4">
                    {slide.description}
                  </p>
                  {slide.features && (
                    <ul className="space-y-4">
                      {slide.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                          <span className="text-base font-light text-gray-600 leading-none">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Right Side - Image Grid (1/3 width) */}
              <div className="w-full md:w-1/2 h-full p-4 lg:p-6 xl:p-8 flex items-center justify-center">
                <div className="h-full md:h-3/4 w-full flex gap-2 lg:gap-3 xl:gap-4">
                  {/* Left Column - Big Image */}
                  <div className="w-2/3 flex flex-col">
                    <div className="flex-1 relative">
                      <Image
                        src={slide.images[0]}
                        alt={`${slide.title} - Main`}
                        fill
                        className="object-cover"
                        priority={slide.id === 1}
                      />
                    </div>
                    {slide.imageTitles && slide.imageTitles[0] && (
                      <p className="text-xs text-gray-500 mt-2 italic leading-tight">
                        {slide.imageTitles[0]}
                      </p>
                    )}
                  </div>

                  {/* Right Column - Smaller Images */}
                  <div className="w-1/3 flex flex-col gap-2 lg:gap-3 xl:gap-4">
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1 relative">
                        <Image
                          src={slide.images[1]}
                          alt={`${slide.title} - Secondary 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {slide.imageTitles && slide.imageTitles[1] && (
                        <p className="text-xs text-gray-500 mt-2 italic leading-tight">
                          {slide.imageTitles[1]}
                        </p>
                      )}
                    </div>

                    {slide.images[2] && (
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1 relative">
                          <Image
                            src={slide.images[2]}
                            alt={`${slide.title} - Secondary 2`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {slide.imageTitles && slide.imageTitles[2] && (
                          <p className="text-xs text-gray-500 mt-2 italic leading-tight">
                            {slide.imageTitles[2]}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AmenitiesSlider;
