/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from "react";

const Hero = ({ onLogoVisibilityChange }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const imagesRef = useRef([]);
  const frameCount = 348;
  const scrollThreshold = 0.8;

  const animationStateRef = useRef({
    scrollPosition: 0,
    hasCompletedOnce: false,
  });

  useEffect(() => {
    const imageUrls = [];

    for (let i = 0; i < frameCount; i++) {
      const frameNumber = 1000 + i;
      imageUrls.push(`/images/hero/YIGO_OPTION${frameNumber}.png`);
    }

    const loadImages = async () => {
      try {
        const loadPromises = imageUrls.map((url, index) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(new Error(`Failed to load ${url}`));
            img.src = url;
          });
        });

        const images = await Promise.all(loadPromises);
        imagesRef.current = images;
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoadingError(error.message);
      }
    };

    loadImages();
  }, []);

  const drawImage = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesRef.current[index]) return;

    const context = canvas.getContext("2d");
    const img = imagesRef.current[index];

    context.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  const updateAnimation = useCallback(
    (scrollPercent) => {
      const frame = Math.floor(scrollPercent * (frameCount - 1));
      setCurrentFrame(frame);

      const shouldShowLogo = scrollPercent > scrollThreshold;
      onLogoVisibilityChange?.(shouldShowLogo);

      if (scrollPercent >= 0.999) {
        setAnimationComplete(true);
        setIsLocked(false);
        animationStateRef.current.hasCompletedOnce = true;
      } else {
        setAnimationComplete(false);
        setIsLocked(true);
      }

      drawImage(frame);
    },
    [drawImage, onLogoVisibilityChange]
  );

  const getHeroStatus = useCallback(() => {
    if (!containerRef.current) return { shouldControl: false, position: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const scrolledPastTop = Math.max(0, -rect.top);
    const heroHeight = rect.height;

    const isHeroAtTop = rect.top <= 10 && rect.top >= -50;
    const isHeroPastViewport = rect.bottom < viewportHeight * 0.2;

    return {
      shouldControl: isHeroAtTop && !isHeroPastViewport,
      isCompletelyAbove: rect.bottom < 0,
      isCompletelyBelow: rect.top > viewportHeight,
      rectTop: rect.top,
      rectBottom: rect.bottom,
    };
  }, []);

  const handleScroll = useCallback(
    (deltaY) => {
      const status = getHeroStatus();
      const state = animationStateRef.current;

      if (deltaY > 0) {
        if (status.shouldControl && state.scrollPosition < 1) {
          const newScrollPosition = Math.min(
            1,
            state.scrollPosition + deltaY * 0.001
          );
          state.scrollPosition = newScrollPosition;
          updateAnimation(state.scrollPosition);

          if (newScrollPosition >= 0.999) {
            return false;
          }
          return true; 
        }
        return false;
      }
      else {
        if (status.isCompletelyAbove) {
          return false;
        }

        if (status.shouldControl) {
          if (state.scrollPosition > 0) {
            const newScrollPosition = Math.max(
              0,
              state.scrollPosition + deltaY * 0.001
            );
            state.scrollPosition = newScrollPosition;
            updateAnimation(state.scrollPosition);

            if (newScrollPosition <= 0) {
              state.scrollPosition = 0;
              updateAnimation(0);
              return false; 
            }
            return true; 
          }
          return false;
        }

  
        if (status.rectTop > 10) {
          return false;
        }

        if (
          status.rectTop <= 10 &&
          status.rectTop >= -50 &&
          state.hasCompletedOnce
        ) {
          if (state.scrollPosition === 0) {
            state.scrollPosition = 1;
            updateAnimation(1);
          }
          return false;
        }

        return false;
      }
    },
    [updateAnimation, getHeroStatus]
  );

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImage(currentFrame);
    };

    setCanvasSize();

    const handleWheel = (e) => {
      if (handleScroll(e.deltaY)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchStart = (e) => {
      animationStateRef.current.lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = animationStateRef.current.lastTouchY - touchY;
      animationStateRef.current.lastTouchY = touchY;

      if (handleScroll(deltaY * 2)) {
        e.preventDefault();
      }
    };

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    drawImage(0);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesLoaded, currentFrame, drawImage, handleScroll]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white overflow-hidden"
      style={{ height: isLocked ? "100vh" : "auto", minHeight: "100vh" }}
    >
      <div
        className={`${
          isLocked ? "fixed" : "relative"
        } top-0 left-0 w-full h-full`}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {currentFrame < 5 && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10 pointer-events-none">
            <div className="w-6 h-10 border-2 border-gray-700 rounded-full mx-auto flex justify-center pt-2">
              <div className="w-1 h-3 bg-gray-700 rounded-full animate-bounce" />
            </div>
            <p className="text-xs tracking-widest mb-2 text-gray-700 mt-2">
              SCROLL TO BEGIN
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
