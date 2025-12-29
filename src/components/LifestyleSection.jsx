/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LifestyleSection = () => {
  const { t } = useTranslation('home');
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    const panels = wrapper.querySelectorAll(".panel");
    const totalWidth = panels.length * window.innerWidth;

    const scrollTween = gsap.to(wrapper, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 0.5,
          ease: "power2.inOut",
        },
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  const panels = [
    {
      id: "amenities",
      title: t('lifestyle.amenities.title'),
      heading: t('lifestyle.amenities.heading'),
      description: t('lifestyle.amenities.description'),
      features: t('lifestyle.amenities.features', { returnObjects: true }),
      images: [
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Fwellness_zone.webp&w=640&q=75",
          caption: t('lifestyle.amenities.imageCaptions.pool'),
          large: true,
        },
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Flobby.webp&w=828&q=75",
          caption: t('lifestyle.amenities.imageCaptions.fitness'),
        },
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Fpool.webp&w=750&q=75",
          caption: t('lifestyle.amenities.imageCaptions.community'),
        },
      ],
    },
    {
      id: "urban-living",
      title: t('lifestyle.urbanLiving.title'),
      heading: t('lifestyle.urbanLiving.heading'),
      description: t('lifestyle.urbanLiving.description'),
      features: t('lifestyle.urbanLiving.features', { returnObjects: true }),
      images: [
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Furban_living.webp&w=3840&q=75",
          caption: t('lifestyle.urbanLiving.imageCaptions.urban'),
          large: true,
        },
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Furban_living_2.webp&w=750&q=75",
          caption: t('lifestyle.urbanLiving.imageCaptions.vibrant'),
        },
      ],
    },
    {
      id: "interiors",
      title: t('lifestyle.interiors.title'),
      heading: t('lifestyle.interiors.heading'),
      description: t('lifestyle.interiors.description'),
      features: t('lifestyle.interiors.features', { returnObjects: true }),
      images: [
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Finteriors.webp&w=2048&q=75",
          caption: t('lifestyle.interiors.imageCaptions.rooms'),
          large: true,
        },
        {
          src: "https://yigogroup.ae/_next/image?url=%2Fimages%2Finteriors_2.webp&w=1080&q=75",
          caption: t('lifestyle.interiors.imageCaptions.living'),
        },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="horizontal-section relative overflow-hidden h-screen"
    >
      <div
        ref={wrapperRef}
        className="horizontal-wrapper flex h-full"
      >
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className="panel relative h-full bg-white border-r border-black/20"
            style={{ width: "100vw", flexShrink: 0 }}
          >
            <div className="relative z-10 h-full flex flex-col md:flex-row overflow-y-auto md:overflow-y-visible">
              {/* Left Column - Text Content */}
              <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col p-8 lg:p-12 xl:p-16 md:pr-0!">
                {/* Title at top */}
                <div className="shrink-0 mb-8 md:mb-auto">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 tracking-tight leading-tight uppercase">
                    {panel.title}
                  </h2>
                </div>

                {/* Content at bottom */}
                <div className="border-t border-black/20 pt-6 md:mt-auto md:ml-15 ">
                  <h3 className="text-xl sm:text-2xl lg:text-2xl font-normal text-gray-900 mb-5 tracking-wide leading-tight">
                    {panel.heading}
                  </h3>
                  <p className="text-base font-light text-gray-600 max-w-lg leading-snug mb-4">
                    {panel.description}
                  </p>
                  <ul className="space-y-4">
                    {panel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 rounded-full mt-2.5 mr-4 shrink-0"></span>
                        <span className="text-base font-light text-gray-600 leading-none">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="w-full md:w-1/2 h-auto md:h-full p-6 lg:p-8 xl:p-10 flex items-center justify-center">
                <div className="h-full md:h-3/4 w-full flex gap-3 lg:gap-4">
                  {/* Large Image */}
                  {panel.images.find((img) => img.large) && (
                    <div className="w-2/3 flex flex-col">
                      <div className="flex-1 relative overflow-hidden min-h-50 md:min-h-0">
                        <img
                          src={panel.images.find((img) => img.large).src}
                          alt={panel.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 italic leading-tight">
                        {panel.images.find((img) => img.large).caption}
                      </p>
                    </div>
                  )}

                  {/* Small Images Column */}
                  <div className="w-1/3 flex flex-col gap-3 lg:gap-4">
                    {panel.images
                      .filter((img) => !img.large)
                      .map((image, idx) => (
                        <div key={idx} className="flex-1 flex flex-col">
                          <div className="flex-1 relative overflow-hidden min-h-25 md:min-h-0">
                            <img
                              src={image.src}
                              alt={`${panel.title} ${idx + 2}`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2 italic leading-tight">
                            {image.caption}
                          </p>
                        </div>
                      ))}
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

export default LifestyleSection;