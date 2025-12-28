/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProjects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    { name: "Beihu Splendor Residence", image: "/public/images/project/1.jpg" },
    {
      name: "Donghu International Hotel",
      image: "/public/images/project/2.png",
    },
    {
      name: "Mansion Court Hotel Apartment",
      image: "/public/images/project/3.jpg",
    },
    { name: "Moher Cloud Cape Villas", image: "/public/images/project/4.jpg" },
    {
      name: "YIGO26 International City – Dubai",
      image: "/public/images/project/5.jpg",
    },
    { name: "Zhongzhou One Residence", image: "/public/images/project/1.jpg" },
    {
      name: "Jiangxi International Business Center",
      image: "/public/images/project/6.png",
    },
    {
      name: "Minle Culture & Creative Park",
      image: "/public/images/project/1.jpg",
    },
  ];

  const getInitialIndex = () => {
    return Math.floor(projects.length / 2);
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex());
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  const calculateVisibleCards = (centerIndex) => {
    const visibleCount = 7; 
    const halfVisible = Math.floor(visibleCount / 2); 

    const cards = [];

    for (let i = -halfVisible; i <= halfVisible; i++) {
      const projectIndex = centerIndex + i;

      if (projectIndex >= 0 && projectIndex < projects.length) {
        cards.push({
          index: projectIndex,
          data: projects[projectIndex],
          position: i,
          isPlaceholder: false,
        });
      } else {
        cards.push({
          index: null,
          data: null,
          position: i,
          isPlaceholder: true,
        });
      }
    }

    return cards;
  };

  useEffect(() => {
    setVisibleCards(calculateVisibleCards(currentIndex));
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating || currentIndex >= projects.length - 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const getCardStyle = (position) => {
    const absPos = Math.abs(position);

    let scale, zIndex, translateX, rotateY, opacity;

    if (absPos === 0) {
      // Center card
      scale = 1;
      zIndex = 70;
      translateX = 0;
      rotateY = 0;
      opacity = 1;
    } else if (absPos === 1) {
      // Immediate adjacent cards
      scale = 0.85;
      zIndex = 60;
      translateX = position * 190; 
      rotateY = position * -20;
      opacity = 1;
    } else if (absPos === 2) {
      // Second level
      scale = 0.75;
      zIndex = 50;
      translateX = position * 170; 
      // rotateY = position * -20;
      opacity = 1;
    } else if (absPos === 3) {
      // Outer cards
      scale = 0.65;
      zIndex = 40;
      translateX = position * 160; 
      // rotateY = position * -40;
      opacity = 1;
    }

    return {
      scale,
      zIndex,
      translateX,
      rotateY,
      opacity,
    };
  };

  return (
    <section ref={ref} className="py-9 w-screen  bg-neutral-50 overflow-hidden">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl  font-normal text-neutral-900 mb-6">
            FEATURED PROJECTS
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover some of our most innovative and impactful projects that
            showcase our commitment to excellence and sustainability.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full pb-7 px-4">
          <div
            className="relative w-full max-w-7xl mx-auto h-70 flex items-center justify-center"
            style={{ perspective: "2800px" }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {visibleCards.map(({ index, data, position, isPlaceholder }) => {
                const style = getCardStyle(position);
                const isActive = position === 0;

                if (isPlaceholder) return null;

                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    animate={{
                      scale: style.scale,
                      x: style.translateX,
                      rotateY: style.rotateY,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className={`relative overflow-hidden bg-neutral-200 ${
                        isActive ? "shadow-2xl" : "shadow-lg"
                      }`}
                      style={{
                        width: "220px", 
                        height: "300px",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src={data.image}
                        alt={data.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0">
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 to-transparent"></div>
                        <div className="relative flex items-end justify-center pb-6 px-4">
                          <span className="text-lg lg:text-xl font-normal text-white text-center leading-tight">
                            {data.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-0 z-80">
              <button
                onClick={prevSlide}
                disabled={isAnimating || currentIndex <= 0}
                className="pointer-events-auto inline-flex items-center justify-center text-white hover:opacity-80 transition-opacity -ml-8 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous project"
              >
                <ChevronLeft
                  className="w-20 h-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  strokeWidth={1}
                />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating || currentIndex >= projects.length - 1}
                className="pointer-events-auto inline-flex items-center justify-center text-white hover:opacity-80 transition-opacity -mr-8 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next project"
              >
                <ChevronRight
                  className="w-20 h-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  strokeWidth={1}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
