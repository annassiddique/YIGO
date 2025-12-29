/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProjectCarousel = ({
  projects,
  showTitle = true,
  title = "FEATURED PROJECTS",
  description = "",
}) => {
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
      scale = 1;
      zIndex = 70;
      translateX = 0;
      rotateY = 0;
      opacity = 1;
    } else if (absPos === 1) {
      scale = 0.85;
      zIndex = 60;
      translateX = position * 190;
      rotateY = position * -20;
      opacity = 1;
    } else if (absPos === 2) {
      scale = 0.75;
      zIndex = 50;
      translateX = position * 170;
      opacity = 1;
    } else if (absPos === 3) {
      scale = 0.65;
      zIndex = 40;
      translateX = position * 160;
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
    <div className="w-full">
      {showTitle && (
        <div className="text-center mb-16">
          <h2 className="text-4xl font-normal text-neutral-900 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

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
  );
};

export default ProjectCarousel;
