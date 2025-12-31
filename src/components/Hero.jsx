/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * RESPONSIVE ANIMATION CONFIGURATION
 * 
 * This configuration object contains separate positioning, scaling, and animation values
 * for desktop (≥768px) and mobile (<768px) viewports. The animation sequence remains
 * identical across all devices, but positioning values are optimized for each viewport size.
 * 
 * Key principles:
 * - Desktop values preserve the original animation exactly as-designed
 * - Mobile values use proportional scaling and adjusted positioning to fit smaller screens
 * - All phase percentages and durations remain unchanged (responsive positioning only)
 * - SVG scales are reduced by ~20-30% on mobile for better fit
 */
const animationConfig = {
  desktop: {
    initialLine: { left: "3%", top: "56%", scale: 1.05, phase5: { left: "4%", top: "58%", scale: 0.6 }, phase11: { left: "-9%", top: "33%", scale: 0.6 } },
    connectingLine: { left: "47%", top: "79%", scale: 1, phase8: { width: "400", left: "-6%", top: "70%", scale: 1.5 }, phase11: { left: "41%", top: "73.2%", scale: 0.7 } },
    svg1Phase4: { scale: 1 },
    svg1Phase5: { scale: 0.45, x: "-24%", y: "8%" },
    svg1Phase8: { x: "-150%", y: "-100%" },
    svg2Phase9: { x: "0%", y: "6%", scale: 1 },
    svg1Phase11: { scale: 0.55, x: "-21%", y: "1%" },
    svg2Phase11: { scale: 0.55, x: "26%", y: "14%" },
    logo: { initialScale: 2, finalScale: 0.5, finalY: "-41.5%", finalX: "-1.4%" },
  },
  mobile: {
    initialLine: { left: "5%", top: "63%", scale: 0.5, phase5: { left: "16%", top: "59.3%", scale: 0.6 }, phase11: { left: "-26%", top: "35%", scale: 0.5 } },
    connectingLine: { left: "50%", top: "69%", scale: 0.5, phase8: { width: "30", left: "-5%", top: "60%", scale: 1.2 }, phase11: { left: "67%", top: "58.5%", scale: 1.2 } },
    svg1Phase4: { scale: 1 },
    svg1Phase5: { scale: 0.35, x: "-18%", y: "5%" },
    svg1Phase8: { x: "-150%", y: "-100%" },
    svg2Phase9: { x: "0%", y: "4%", scale: 1 },
    svg1Phase11: { scale: 0.45, x: "-18%", y: "0%" },
    svg2Phase11: { scale: 0.45, x: "32%", y: "5%" },
    logo: { initialScale: 1.8, finalScale: 0.4, finalY: "-38%", finalX: "-1%" },
  },
};

const Hero = ({ onLogoVisibilityChange }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const connectingLineRef = useRef(null);
  const svg2Ref = useRef(null);
  const svg2ContainerRef = useRef(null);
  const [animationPhase, setAnimationPhase] = useState("initial");
  const logoRef = useRef(null);
  const [showLogo, setShowLogo] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");
    const paths2 = svg2Ref.current?.querySelectorAll("path") || [];
    const connectingLine = connectingLineRef.current;

    // Get the initial line (first standalone SVG)
    const initialLineSvg =
      containerRef.current.querySelector('svg[width="318"]');
    const initialLine = initialLineSvg?.querySelector("path");
    
    // Get current viewport state and select appropriate config
    const currentIsMobile = window.innerWidth < 768;
    const scrollMultiplier = currentIsMobile ? 5 : 3;
    const config = currentIsMobile ? animationConfig.mobile : animationConfig.desktop;

    // Get connecting line SVG container
    const connectingLineSvg =
      containerRef.current.querySelector('svg[width="121"]');

    // Prepare all paths
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    paths2.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    // Prepare initial line - position it on the left from the start using config
    if (initialLine && initialLineSvg) {
      const lineLength = initialLine.getTotalLength();
      initialLine.style.strokeDasharray = lineLength;
      initialLine.style.strokeDashoffset = lineLength;
      initialLine.style.stroke = "#000";
      initialLineSvg.style.position = "absolute";
      initialLine.style.scale = config.initialLine.scale;
      initialLineSvg.style.top = config.initialLine.top;
      initialLineSvg.style.left = config.initialLine.left;
      initialLineSvg.style.transform = "translate(-50%, -50%)";
      initialLineSvg.style.zIndex = "10";
    }

    // Prepare connecting line using config
    if (connectingLine && connectingLineSvg) {
      const lineLength = connectingLine.getTotalLength();
      connectingLine.style.strokeDasharray = `${lineLength}`;
      connectingLine.style.strokeDashoffset = `${lineLength}`;
      connectingLine.style.stroke = "#000";
      connectingLineSvg.style.position = "absolute";
      connectingLineSvg.style.top = config.connectingLine.top;
      connectingLineSvg.style.left = config.connectingLine.left;
      connectingLineSvg.style.transform = "translate(-50%, -50%)";
      connectingLineSvg.style.zIndex = "10";
      connectingLineSvg.style.opacity = "1";
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * scrollMultiplier}`, // Dynamic end based on device
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress < 0.05) {
            setAnimationPhase("initial");
          } else if (progress < 0.1) {
            setAnimationPhase("initial-line");
          } else if (progress < 0.3) {
            setAnimationPhase("drawing");
          } else if (progress < 0.4) {
            setAnimationPhase("zoom-out");
          } else if (progress < 0.47) {
            setAnimationPhase("connecting");
          } else if (progress < 0.5) {
            setAnimationPhase("zoom-in-end");
          } else if (progress < 0.72) {
            setAnimationPhase("drawing-2");
          } else if (progress < 0.85) {
            setAnimationPhase("zoom-out-both");
            setShowLogo(false); // Hide logo during this phase
          } else if (progress < 0.92) {
            window.dispatchEvent(
              new CustomEvent("heroSectionActive", {
                detail: { active: true },
              })
            );
          } else {
            window.dispatchEvent(
              new CustomEvent("heroSectionActive", {
                detail: { active: false },
              })
            );
          }
          // Update the logo visibility callback
          if (onLogoVisibilityChange) {
            onLogoVisibilityChange(progress > 0.92);
          }
        },
      },
    });

    // Phase 1: Draw initial line on the left (0-5%)
    if (initialLine) {
      tl.to(initialLine, {
        strokeDashoffset: 0,
        duration: 0.05,
        ease: "none",
      });
    }

    // Phase 2: First SVG appears in position and starts drawing (5-10%)
    // Set initial position and opacity
    tl.set(svg2ContainerRef.current, {
      x: "0%",
      opacity: 1,
    });

    // Phase 3: First SVG draws (10-30%)
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 0.2,
      ease: "none",
    });

    // Phase 4: Zoom out first SVG (30-35%) - using config
    tl.to(svg2ContainerRef.current, {
      scale: config.svg1Phase4.scale,
      duration: 0.05,
      ease: "power2.inOut",
    });

    // Phase 5: Move first SVG to top-left & adjust initial line (35-40%) - using config
    tl.to(svg2ContainerRef.current, {
      scale: config.svg1Phase5.scale,
      x: config.svg1Phase5.x,
      y: config.svg1Phase5.y,
      duration: 0.05,
      ease: "power2.inOut",
    });

    if (initialLineSvg) {
      tl.to(
        initialLineSvg,
        {
          left: config.initialLine.phase5.left,
          top: config.initialLine.phase5.top,
          scale: config.initialLine.phase5.scale,
          duration: 0.05,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Phase 6: Show connecting line (40-42%)
    if (connectingLineSvg) {
      tl.to(connectingLineSvg, {
        opacity: 1,
        duration: 0.02,
        ease: "none",
      });
    }

    // Phase 7: Draw connecting line (42-47%)
    if (connectingLine) {
      tl.to(connectingLine, {
        strokeDashoffset: 0,
        duration: 0.05,
        ease: "power1.inOut",
      });
    }

    // Phase 8: Move first SVG and initial line OUT OF FRAME (simulating zoom in) (47-50%)
    // Move connecting line to where second SVG will appear - using config
    tl.to(svg2ContainerRef.current, {
      x: config.svg1Phase8.x,
      y: config.svg1Phase8.y,
      duration: 0.02,
      ease: "power2.inOut",
    });

    if (initialLineSvg) {
      tl.to(
        initialLineSvg,
        {
          x: config.svg1Phase8.x,
          y: config.svg1Phase8.y,
          duration: 0.01,
          ease: "power2.inOut",
        },
        "<" // At the same time
      );
    }

    // Move connecting line to center where second SVG will appear - using config
    if (connectingLineSvg) {
      tl.to(
        connectingLineSvg,
        {
          width: config.connectingLine.phase8.width,
          left: config.connectingLine.phase8.left,
          top: config.connectingLine.phase8.top,
          scale: config.connectingLine.phase8.scale,
          duration: 0.02,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    // Phase 9: Position second SVG in CENTER and show it (50-52%) - using config
    tl.set("#svg2-container", {
      opacity: 1,
      scale: config.svg2Phase9.scale,
      x: config.svg2Phase9.x,
      y: config.svg2Phase9.y,
    });

    // Phase 10: Draw second SVG in the center (52-72%)
    tl.to(paths2, {
      strokeDashoffset: 0,
      duration: 0.2,
      ease: "none",
    });

    // Phase 11: Zoom out to show BOTH landscapes (72-85%) - using config
    // Smoothly animate from center to final positions
    tl.to(svg2ContainerRef.current, {
      scale: config.svg1Phase11.scale,
      x: config.svg1Phase11.x,
      y: config.svg1Phase11.y,
      opacity: 1,
      duration: 0.13,
      ease: "power2.inOut",
    });

    tl.to(
      "#svg2-container",
      {
        scale: config.svg2Phase11.scale,
        x: config.svg2Phase11.x,
        y: config.svg2Phase11.y,
        opacity: 1,
        duration: 0.13,
        ease: "power2.inOut",
      },
      "<" // Start at the same time as first SVG
    );

    if (initialLineSvg) {
      tl.to(
        initialLineSvg,
        {
          left: config.initialLine.phase11.left,
          top: config.initialLine.phase11.top,
          scale: config.initialLine.phase11.scale,
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 0.14,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    if (connectingLineSvg) {
      tl.to(
        connectingLineSvg,
        {
          left: config.connectingLine.phase11.left,
          top: config.connectingLine.phase11.top,
          scale: config.connectingLine.phase11.scale,
          opacity: 1,
          duration: 0.13,
          ease: "power2.inOut",
        },
        "<"
      );
    }
    // Phase 12: Logo appears and animates (85-100%) - using config
    if (logoRef.current) {
      // Initial state: large logo in center, hidden
      tl.set(logoRef.current, {
        opacity: 0,
        scale: config.logo.initialScale,
        x: "0%",
        y: "0%",
      });

      // Fade in logo (85-87%)
      tl.to(logoRef.current, {
        opacity: 1,
        duration: 0.02,
        ease: "power2.in",
      });

      // Hold at center briefly (87-90%)
      tl.to(logoRef.current, {
        duration: 0.03,
      });

      // Move to top and shrink, then fade out (90-100%)
      tl.to(logoRef.current, {
        scale: config.logo.finalScale,
        y: config.logo.finalY,
        x: config.logo.finalX,
        duration: 0.08,
        opacity: 0,
        ease: "power2.inOut",
      });

      // Fade out as it reaches header position (98-100%)
      tl.to(logoRef.current, {
        opacity: 0,
        duration: 0.02,
        ease: "power2.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.dispatchEvent(
        new CustomEvent("heroSectionActive", {
          detail: { active: false },
        })
      );
    };
  }, [onLogoVisibilityChange, isMobile]);

  // Handle window resize to recalculate ScrollTrigger and update mobile state
  useEffect(() => {
    const handleResize = debounce(() => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
      ScrollTrigger.refresh();
    }, 150);

    window.addEventListener("resize", handleResize);
    // Also check on orientation change for mobile devices
    window.addEventListener("orientationchange", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-white">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10 pointer-events-none">
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full mx-auto flex justify-center pt-2">
            <div className="w-1 h-3 bg-gray-700 rounded-full animate-bounce" />
          </div>
          <p className="text-xs tracking-widest mb-2 text-gray-700 mt-2">
            SCROLL TO BEGIN
          </p>
        </div>
        {/* Initial line */}
        <svg
          viewBox="0 0 179 167"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.203072 14C54.2031 -10 86.2031 4.5 96.2031 8.5C106.203 12.5 113.703 33 110.203 42C106.703 51 106.203 49.5 106.203 49.5L98.7031 57.5L89.2031 64.5L74.7031 74.5L60.7031 86C60.7031 86 44.2031 95 44.2031 121.5C44.2031 148 66.7031 147 77.7031 153C88.7031 159 116.703 161 140.703 163.5C164.703 166 166.703 165.5 178.703 166"
            stroke="white"
          />
        </svg>
        <svg
          width="318"
          height="251"
          viewBox="0 0 224 167"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45.197 14C99.197 -10 131.197 4.5 141.197 8.5C151.197 12.5 158.697 33 155.197 42C151.697 51 151.197 49.5 151.197 49.5L143.697 57.5L134.197 64.5L119.697 74.5L105.697 86C105.697 86 89.197 95 89.197 121.5C89.197 148 111.697 147 122.697 153C133.697 159 161.697 161 185.697 163.5C209.697 166 211.697 165.5 223.697 166"
            stroke="white"
          />
          <path d="M45.697 14L0.19696 33.5" stroke="white" />
        </svg>

        {/* First SVG - Hong Kong */}
        <div
          ref={svg2ContainerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            ref={svgRef}
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1536 1024"
            className="w-full h-full"
            style={{ maxWidth: "100%", maxHeight: "100vh" }}
          >
            <defs>
              <style>
                {`
                .st0 {
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 2px;
                }
              `}
              </style>
            </defs>
            <path
              className="st0"
              d="M780,161.5c-6.3,8.3-8.7,18.4-12,28-5.4,15.9-6.9,32.4-7.5,49-.7,19.3-1.2,38.7-1.7,58-.7,23.7-1.7,47.3-1.9,71-.1,14.5-.7,29-.9,43.5-.5,39.2-1.2,78.3-1.1,117.5,0,7.8.3,15.7,0,23.5-.7,20,.2,40-.7,60,0,1.7.4,3.7.4,5.5.3,39.7-.9,79.3-.5,119,0,4.7-.6,9.3-.5,14"
            />
            <path
              className="st0"
              d="M823.5,256.5c-16.3.9-32.7.3-49.6.6.2-7.1,0-13.5.5-20.1.9-9.6,1.4-19.3,2-29,1-15.5,3.5-30.9,4.1-46.5.1-3.3,1.4-5.3,5.5-5.1,8.5.3,17,.2,25.5,0,2.9,0,4.1,1,5.6,3.5,9.6,14.9,13.5,31.7,16.7,48.6,2.1,11.2,2.2,22.6,3.1,34,1.6,20.6,2.1,41.3,2.9,62,.3,7.8,1,15.7,1,23.5,0,22.3.7,44.7,1.4,67,.5,16,.3,32,.8,48,.3,8.5,1,17,1,25.5,0,89.2,0,178.3,0,267.5v37"
            />
            <path
              className="st0"
              d="M616.5,778c-5.3-4.1-11.9-3.9-18-5.4-12.4-3-24.9-5.4-37.5-7.4-14.7-2.3-29.6-4.3-44.5-5.7-23.8-2.3-47.6-3.6-71.5-3.6-22.6,0-45,1.1-67.5,3-24.7,2.1-49.2,5.3-73.5,10.1-17.1,3.3-34.2,6.5-51,11-1.6.4-2.8,1.1-4,2.1"
            />
            <path
              className="st0"
              d="M937,762c0,6.2.2,12.3,0,18.5-.2,4,1.2,5.3,5.1,5,18.7-1.3,37.3.4,56,0,19.3-.3,38.7-.2,58,0,24.7.2,49.3-1,74-.4,14,.3,28,.5,42,.3,95.2-1.1,190.3-.1,285.5-.4,18.3,0,36.7,0,55,0"
            />
            <path
              className="st0"
              d="M338,548.5c1.5,5.6.3,11.4.3,17,.3,63.7.2,127.3.2,191"
            />
            <path
              className="st0"
              d="M514,545.5c-3.9,9.5-6,19.2-6.6,29.5-.9,16.7-.3,33.3-.4,50-.1,19.5-.5,39,.1,58.5.3,10.5,0,21,.1,31.5.2,10.5-.2,21-.4,31.5,0,1.7,1.2,3.3,0,5"
            />
            <path
              className="st0"
              d="M586,762.5c.2-20.3.6-40.7.5-61,0-23.8.3-47.7-.1-71.5-.2-12.5-.3-25,0-37.5.1-5.3-.5-10.7-.3-16.5h-17.6"
            />
            <path
              className="st0"
              d="M331,757v-174.3c-15.8-.9-31.6-2.4-48-1.5v20.8"
            />
            <path
              className="st0"
              d="M1223.5,420.5c1.2,1.5.7,3.4.8,5,.3,3,1.5,4.3,4.2,5,12.6,3.3,22.8,11,33,18.6,11.8,8.7,21.5,19.8,31.5,30.4,17.2,18.2,33.2,37.7,54.5,51.5,18.8,12.2,38.3,23,59,31.5"
            />
            <path
              className="st0"
              d="M828,603.5c0,18.8-.2,37.7,0,56.5.4,37.8.5,75.7.5,113.5"
            />
            <path
              className="st0"
              d="M1130,738.5c.1-9-.5-18-.5-27,0-49,0-98,0-147s-3.6-10.4-10.5-9.9c-10.3.8-20.7.1-31,.4"
            />
            <path
              className="st0"
              d="M962,527c-5.2,2-10.5,3.8-16.5,5.1-.4,68.8.4,137.6.5,206.4"
            />
            <path className="st0" d="M1087.5,547.5v171.5" />
            <path
              className="st0"
              d="M1121.5,555.5c-1.3,2-1,4.3-1,6.5,0,46.7,0,93.3,0,140,0,5.5.4,11,.4,16.5"
            />
            <path
              className="st0"
              d="M1155.5,579.5c-5.1,2.3-10.8,2.8-16.1,4.8-3.2,1.2-3.5,2.9-3.5,5.7,0,11.5.2,23,0,34.5-.3,18-.9,36-.3,54,.7,22.7-.3,45.3.9,68,.3,5.3.8,6.3,6,5.8,2.5-.2,2,.9,2,2.2"
            />
            <path
              className="st0"
              d="M427,749c0-31,.1-62,0-93,0-6.8-.9-13.7-.3-20.5.8-9.5-.2-19-.1-28.5,0-2.4-.4-4-3.5-4.1-3.7-.2-7.3-.9-11-.9-12.8-.2-25.7.6-38.5-.4-1.3-.1-2.8.3-4,1.4-3.1,2.6-6,5.4-10,6.5-1.5.4-1.5,1.3-1.5,2.5,0,1,0,2,0,3,0,39.7-.2,79.3.2,119,0,6.5-.9,13.1.8,19.5"
            />
            <path
              className="st0"
              d="M774,257.5c-1.6,5.1-1,10.3-1,15.5,0,13.8-.3,27.7-.7,41.5-.7,28.2-.1,56.3-.4,84.5-.1,14.7.5,29.4-.1,44-1,23.7.3,47.3-.8,71-.5,11.3.4,22.7.2,34-.3,18.5.3,37,0,55.5-.7,47.5,0,95-.4,142.5,0,1.7.3,3.4-.5,5"
            />
            <path
              className="st0"
              d="M367,611.5c-1.2,12.5-.6,25-.3,37.5,0,4.4-.3,8.7-.2,13,0,15.2.1,30.3.5,45.5.3,13.5.2,27-.4,40.5,0,1.7-.3,3.4.5,5"
            />
            <path
              className="st0"
              d="M678,596.5c-2.4,5.7-.8,11.7-.9,17.5-.3,22.2,0,44.3-.2,66.5-.1,13.2-.5,26.3-.5,39.5,0,13.5-.2,27,.3,39.9,3.3,2.5,7.1-.9,9.3,2.6"
            />
            <path
              className="st0"
              d="M1185,547c-.7,35.5-.7,71-.3,106.5,0,8.8-.4,17.7.8,26.5"
            />
            <path
              className="st0"
              d="M1207,784c.3-1.4-.5-2.6-.6-4-.3-3.5-2.1-5.1-5.9-5.1-15.5.2-31,0-46.5,0-28.7,0-57.3-.1-86,0-15.2,0-30.3-.6-45.5.4-2.3.1-4.6.9-7,.5"
            />
            <path
              className="st0"
              d="M1189,546.5c0,41.2,0,82.3,0,123.5,0,2.6-1.3,5.4.4,8"
            />
            <path
              className="st0"
              d="M753.5,612c-3.8,1-7.7,0-11.5.9-1.2,4.6-.6,9.1-.6,13.6.1,29.3.3,58.7-.1,88,0,6,1.3,12-.3,18"
            />
            <path
              className="st0"
              d="M610.5,767.5c1.1-36.8.3-73.7.4-110.5,0-4,1-5.2,5.1-5.1,12.2.3,24.3.1,36.1.1,1.4,1.5.9,2.8.9,4,0,37.5,0,75,0,112.5,0,1.5.3,3.1-.5,4.5"
            />
            <path className="st0" d="M979,514.5v210.5" />
            <path
              className="st0"
              d="M979.5,527h45.2c-.7,66.2-1.5,131.8-1.2,197.5"
            />
            <path
              className="st0"
              d="M970.5,601.5c1.1,1,.5,2.3.5,3.5,0,38.5,0,77,0,115.5,0,1.5.3,3.1-.5,4.5"
            />
            <path
              className="st0"
              d="M1165.5,425c-2.8,2.6-6.9,1-8.3-.2-6-5.5-11.5-2.9-17.2-.2-9.4,4.3-17.3,10.9-25.5,17-20,14.7-38.7,31.1-60,44-8.8,5.3-18.2,9.6-27.5,14.1-1.8.9-2.8.4-4.1-1-1.8-2.1-4.4-3.8-5.9-6.1-2.9-4.4-6.8-4.9-11.6-4.6-6,.5-12-.1-18,.2-2.4.1-5,.5-6.6,3.3-1.9,3.6-5.3,6.2-6.9,10.2.2,1.7,2,1.2,3,1.9"
            />
            <path
              className="st0"
              d="M826,317.5c1.5,6.6,1,13.3,1,20,0,21.2,0,42.3,0,63.5,0,.8.4,1.8-1,3h-53"
            />
            <path
              className="st0"
              d="M985,489.5c-3,10.6-9.2,19.3-18.2,25.3-5.3,3.5-4.2,8.3-4.1,12.2.6,23.2.1,46.3.2,69.5.2,36,0,72,0,108,0,6.8-.7,13.7-.6,20.5"
            />
            <path
              className="st0"
              d="M1159,551.5c-1.2,9.6-.4,19.3-.5,29-.1,38.8,0,77.7,0,116.5,0,.8-.4,1.8.5,2.5"
            />
            <path
              className="st0"
              d="M685.5,622c1.8,1.4,1,3.3,1,5,0,16.7-.2,33.3.1,50,.2,11.5.3,23,.5,34.5.2,15-1.3,30,0,45"
            />
            <path
              className="st0"
              d="M1143.5,758c-6.2.3-12.3.3-18.5.2-9.1-.1-18.3-.3-27.5.1-10.5.5-21,.4-31.5-.2-7.1-.4-14.3-.3-21.5.2-8.6.6-17.3.1-26,.1"
            />
            <path
              className="st0"
              d="M589,791c4.5-9.6,13.5-10.7,22.5-12.1,9.2-1.3,18.4.4,26.3,3.5,10.2,4.1,20.2,2.3,30.2,2.7,21.3.9,42.7-.7,64-.2,11,.3,22,.7,33,.4,33.7-1,67.3-.1,101-.4,3.2,0,6.4,0,9.2,0,1.6-2.3,0-4.7,1.5-7,2.2,0,4.7,0,7.2,0"
            />
            <path
              className="st0"
              d="M888,570c0-14.3,0-28.7,0-43,0-2.6.6-3.6,3.5-4.2,7.3-1.4,14.4-4,22.5-2.4,0,4,0,8,0,12,0,15.8.1,31.7,0,47.5,0,3.6,1.2,4.7,4.6,4.6,5.5-.2,11,0,17,0,0,51.5-.2,103,.7,155.2,6.5-1.1,13.1.9,19.8-.2"
            />
            <path
              className="st0"
              d="M733.5,661h-39.5c-1.6,1.4-1,2.5-1,3.5,0,28.7,0,57.3,0,86,0,1-.6,2.1.5,3"
            />
            <path
              className="st0"
              d="M640,529c2,3.5,1.4,7.5,1.3,11-.8,37,0,74-.3,111"
            />
            <path
              className="st0"
              d="M849.5,739c.7-2,.5-4,.5-6,0-53.7,0-107.3,0-161.5,9.5,0,19-.5,28.5.2,4.2.3,7.9-1.6,12-.9,3,.5,3.8,1.3,4.1,4.2.4,4,.4,8,.4,12,0,44.5,0,89,0,133.5,0,4.9.4,4.9,5.5,5.1,8.2.3,16.3-1.3,24.6.6,4,.9,4.5,2.1,4.5,5.3,0,2.2-.5,4.4.5,6.5-1,1.2-2.4,1.7-4,1.5"
            />
            <path
              className="st0"
              d="M715.5,640c5.2,0,10.3-.1,15.5,0,2.7,0,3.7-1.2,3.5-3.5-1.2-17.2,0-34.3-.6-51.9-6.2-.4-12.5,1-18.8.3-1.2,2.5-.2,4.8,0,7.1.3,4.4-.5,8.7-.4,13,0,2.1-1.1,2-2.5,2-4.5,0-9,0-13.5,1"
            />
            <path
              className="st0"
              d="M462,788.5c3.5,1.3,7-.2,10.5,0,10.5.4,21-.4,31.5.6,1,0,1.5-.4,2.4-1.5-6.3-7.8-13.2-13.3-24.3-14.6-6.2-.7-11.8-.7-17.5.6-9,2.1-15.3,8.1-20,15.9-.3.5,0,1.3,0,2"
            />
            <path
              className="st0"
              d="M821,204.5c1.8,7.9,1.5,16,2.1,24,1.2,15.7,1.9,31.3,2.2,47,.2,13.6,1.8,27.3.4,41.5-17.6-.2-35.1-.1-52.6,0"
            />
            <path
              className="st0"
              d="M827,404.5c1.3,6.5.3,13,.4,19.5.8,28.7.5,57.3.6,86,0,23.8.1,47.7,0,71.5,0,5.7.5,11.3.6,17,0,3.4-1,4.6-4.6,4.6-15-.2-30,0-45-.1-2.4,0-4.7.4-7,.5"
            />
            <path
              className="st0"
              d="M1232,411.5c1.7-2.4,1.5-5.5,3.9-8-8.3-4.3-16.5-7.2-23.8-11.6-6.6-4-13.1-2.5-19.6-.8-11.3,2.9-22.9,4.3-34.1,7.7-3.6,1.1-4.9,2.6-4.9,5.7,0,3.6,2.6,5.4,6.4,5.5,7.7.2,14.6-3.4,22-4.5,5.4-.9,10.7-2.6,16-4.1,4.5-1.3,8.3-.9,12.6,1.4,6.9,3.8,14.6,6,21.5,10-1.1,6-1.1,11.8-1.1,17.7"
            />
            <path
              className="st0"
              d="M543,428.5c-1-5.8-1-11.6-1-17.5,0-13,.7-26,.1-39-.2-3.2,1.2-6.6-3.2-8.1-11.8,11.2-24.4,21.6-36,33-3,3-4,6.1-4,10.1,0,18,0,36,0,54s-.2,48.3,0,72.5c.1,15.7-.8,31.3.4,47,0,1-.7,1.8-1.5,2.5-21.1-4.1-42.3-.1-63.7-1.1-1.1,13.2-.8,25.9-.8,38.6,0,8.8,0,17.7,0,26.5s-.1,24,0,36c.1,8.2.3,16.4.2,24.5,0,13.8,0,27.7-.8,41.5"
            />
            <path
              className="st0"
              d="M1015,784.5c0-9.2,0-18.3,0-27.5,0-1.4,0-2.9-1-4-7-8-15.2-12.9-26.5-11.2-5.2.8-10.7.5-16,1.1-6.5.7-12,3.2-17,7.5-6.7,5.7-11.8,7-19.3,1.4-8-5.9-16.9-6.9-26.1-7.2-6.5-.2-13-1.3-19.5-.2-2.4.4-4.8.7-7,1.6-5.5,2.3-8.2,8.5-7.5,16.4,1,11.5.9,11.9-10,11.4-18.3-.8-36.7.2-55,0-5.6,0-11.1-.1-17.2,1.8,2.3,2.4,2.4,5.3,2.2,8.2"
            />
            <path
              className="st0"
              d="M352.5,546.5c.1-6.2-.1-12.3,0-19.1,14.1.6,27.8,0,41.4,2.3,0,18.6,0,36.9,0,55.3,0,2.3.1,4.7,0,7"
            />
            <path
              className="st0"
              d="M1397.5,628c-8,4.6-16.4,8.6-24,13.9-9.7,6.8-18.3,14.6-25.5,24-4.9,6.4-10.5,12.3-14.8,19.4-9.3-5-18.6-9.2-28.1-13-8.8-3.4-17.6-5.5-27-6-11.5-.7-22.9-1.7-34.5-.5-9,.9-17.5,3.4-26,6.2-20,6.7-39,15.8-53.2,31.7-4.5,5-8.9,9.8-14.3,13.7-2.5,1.7-2.6,4-2.5,6.5,0,3.8.4,7.7-.5,11.7,2.4,1.6,5,.9,7.5.3,8.3-1.9,16.6-3.6,25-4.5"
            />
            <path
              className="st0"
              d="M50.5,785c6.3,1.1,12.7.4,19,.5,14.2.2,28.3-.5,42.5-.5,14.7,0,29.3,0,44,0,2.8,0,5.7,0,8.5,0"
            />
            <path
              className="st0"
              d="M1302.5,754.5c1.1-9.3.2-18.7.6-28.2-23.9.6-47.2-.2-70.6.2"
            />
            <path
              className="st0"
              d="M817,161.5c-2,2.7-.2,5.5.2,8,1.5,10,2.3,20.1,3.8,30,.2,1.3,0,2.7,0,4.5-11.3,0-22.2.1-33,0-3.3,0-6.7,1.5-10,0"
            />
            <path
              className="st0"
              d="M1306.5,660.5c-2.6,1.2-5,0-7.5-.5-13.9-2.6-28-2.6-42-1.8-14.1.8-27.8,4.4-40.9,9.5-9.7,3.7-19.4,7.2-28.7,12.2-10.2,5.5-18.7,12.9-27.4,20.2-2.1,1.8-1.6,4.1.5,5.9"
            />
            <path
              className="st0"
              d="M1325,673c-2.9-4.6-6.6-7.7-11.9-9.7-6.1-2.2-11.3-6.2-18-7.5-8-1.6-16-2.7-24.1-3.6-9.8-1.1-19.6-1.5-29.5-1.1-5.3.2-10.6,2-16,.5"
            />
            <path
              className="st0"
              d="M1410,631c-1.1,2.6-1,5.3-1,8,0,39.5,0,79,0,118.5"
            />
            <path
              className="st0"
              d="M642,540c4.1-.7,4.6.9,4.7,5,.3,21.3.3,42.7.3,64,0,14,0,28,0,42"
            />
            <path
              className="st0"
              d="M1232.5,408.5c-7.6-4.9-15.8-8.7-24-12.5-5.3-2.5-10.5-.5-15.5.6-11.9,2.7-23.8,5.2-35.5,8.3-1,.3-1.5,1.2-2.5,1.1"
            />
            <path
              className="st0"
              d="M1011,489c2.2,5.5,6.2,9.9,9.8,14.3,3.4,4.1,4.9,10.1,10.7,12.3,1.3.5.5,2.3.5,3.4,0,10.7-.3,21.4.1,32,.5,10.7,0,21.3.2,32,.5,32.8.4,65.7.1,98.5,0,10,.8,20-.4,30-.2,1.9-.5,3.9,1,5.5"
            />
            <path
              className="st0"
              d="M434.5,610c19.8,0,39.7,0,59.5,0,5.4,0,6.2.5,5.4,5.5-.8,4.8.4,9.4.1,14,0,1.7.4,3.5-.7,4.9-7.6.5-15,.2-22.3.5-7.3.2-14.7-.6-22-.2-6.7.4-13.4-1-20,.4"
            />
            <path
              className="st0"
              d="M323,604c-5.1-1.5-10.4-.6-15.5-.8-14-.6-28-.2-42.5-.2,0,55.8,0,111.2,0,167.2,7.7-1.8,14.9-3.1,22-4.7,10.4-2.3,21-3.9,31.5-5.7,12-2.1,24-3.7:40 PM3,36-4.9,12.3-1.6,24.6-2.9,37-3.3,19.7-.8,39.3-2.7,59-2.6,15.4.1,30.7,1.2,46,2.5,2.9.3,3-1.1,3-3.1,0-8.5,0-17,0-25.5s0-15,0-22.5c0-3-.7-4-4-4.1-20.3-.5-40.7-.4-61-.4"
            />
            <path
              className="st0"
              d="M124,724c-3.2-1.2-6.6-1.4-10-1.5-11-.3-22,.7-33-.5-1.1-.1-2.1,0-3,1-6.5,7.5-14.9,9.7-24.5,9-1.5-.1-3.1-.3-4.5.5"
            />
            <path className="st0" d="M1428,636.5v74.5" />
            <path
              className="st0"
              d="M516,621.5v31.5c0,31.7,0,63.3,0,95,0,3.9.7,5.5,5.1,5.6,11.9.4,23.5,4.2,35.5,3.2,7.5-.6,15-.8,22.5-.9,2.1,0,2.6-.2,2.7-3,.8-22,0-44,.3-66,0-3.4-1.6-5.1-5-5-16.5.3-33-.7-49.5,1-2.6.3-5.3,0-8,0"
            />
            <path
              className="st0"
              d="M451.5,581c-1.1-13.1,0-26.3-.7-39.7-15-1.3-29.7-3.5-43.9,3.1.2,15.8-.4,31.9.5,48.1"
            />
            <path
              className="st0"
              d="M1302.5,701c-5.7-2.7-11.9-3.6-18-4.9-10.2-2.2-20.6-2.7-31-2.9-17.5-.3-35.1-1.2-52.5,2.3-12,2.4-23.4,6.5-34.5,11.6-1.5.7-2.7,2.1-4.5,2"
            />
            <path
              className="st0"
              d="M538,644c-.6-2.5-2.2-4.3-4-6-5.7-5.6-11.4-11.3-17-17-2.4-2.4-2.2-11.1.5-13.9,6.6-6.9,10.5-15.9,17.9-22.1.2-.1.5-.9.6-1.4,1.9-6.7,2.3-6.9,8.4-3.5,12.4,6.9,23.7,15.4,35.1,23.9,2.2,1.7,2.3,3.6,2.4,5.6.1,22.7,0,45.3.1,68,0,.6-.8.9-.5,1.5"
            />
            <path
              className="st0"
              d="M1467,682c-1.6-5.1-.8-10.3-1.4-15.5-.5-4.8-2-9.4-3.2-14-.8-3,.4-6.2-1.4-9-7-11.1-16.5-18.1-30-19.6-9.6-1-18.7.8-28,2.4-9,1.5-18.1,2.2-27,4.1-18.6,4-37.4,7.3-54.5,16.5"
            />
            <path
              className="st0"
              d="M1050.5,708.5c0-22-.7-44-.5-66.5-2.9.2-5.1-.9-8-.4,0,1.3,0,2.3,0,3.4,0,14.2,0,28.3-.5,42.5-.3,6.8.8,13.7.6,20.5,0,1.8,0,3.5-1,5"
            />
            <path
              className="st0"
              d="M1302.5,711c-1.6-1.1-3.3-.5-5-.5-21.7,0-43.3,0-65,0"
            />
            <path
              className="st0"
              d="M1239.5,526c-6.5-7.7-14.9-13.4-21.5-21-.5-.6-1-1.1-2-1-6.4.7-12.7-.8-19-1-1.8,0-2.9,1-4,2.1-7.2,7.4-14.5,14.5-22.5,21"
            />
            <path
              className="st0"
              d="M1336,757.5c1.5-4.8.1-9.7.3-14.5.4-14.5,1.5-29,.9-43.5-.3-8.6,2.3-15.5,6.9-22,12.7-18.2,29-32.3,49-41.9,5-2.4,10.2-5.1,15.9-5,9.3.2,17.9,3.1,25,9.4,5.3,4.8,10.3,9.9,11.5,17.5.4,2.5-.5,5-.5,7.5.1,15,0,30,0,45,0,1.2.6,2.5-.8,3.9-22-4.5-44.6-2.9-67.2-2.8-13,0-26.1.8-39,2.9"
            />
            <path
              className="st0"
              d="M1136.5,752c-1.6,1.1-3.3.5-5,.5-37,0-74,0-111,0-1.8,0-3.7-.4-5.5.5"
            />
            <path
              className="st0"
              d="M1386,640.5c1.1,1.6.5,3.3.5,5,0,21.7,0,43.3,0,65"
            />
            <path
              className="st0"
              d="M245.5,785c-3.8,1.5-7.7,0-11.5.3-11.6.6-23.3,0-35-.3-9-.2-18,.8-27,.6-2.2,0-4.4-.3-6.5-1"
            />
            <path className="st0" d="M1302,741.5c-23.2-.5-46.3,1.1-69.5,1" />
            <path
              className="st0"
              d="M1260,622c7.3,0,14.7.2,22,0,4.1-.2,6.3,1.7,6.1,6.1-.3,4.8,0,9.7,0,15-14.5-.3-28.5,0-42.8,2.2-.6-3.4.4-6.1.3-8.8-1.3-29.2,0-58.3-.9-87.5-.2-5.8-.2-11.7.3-17.5.3-3.8-2.2-5.2-5-4.9-6.5.8-12.6-1.5-19-1.9-11.5-.6-23,.3-34.5.4-4.8,0-9.8,1.4-14.5,1.4-5.1,0-5.2,1.9-5,5.4.1,1.8-.5,3.7.5,5.5"
            />
            <path
              className="st0"
              d="M1078,651.5c1.1,1.6.5,3.3.5,5,0,21,0,42,0,63"
            />
            <path
              className="st0"
              d="M549.5,286.5c-.8,1.8-.5,3.7-.5,5.5-.3,20.8.4,41.7-.2,62.5,0,3-1.7,2.8-2.8,3.4-4.9,2.5-9.9,2.8-15,.1-.9-.5-1.9-.7-3-.5"
            />
            <path
              className="st0"
              d="M375,789.5c-.8,1.1-.7,2.7-3,2.6-9.7-.2-19.3,0-29-.2-3,0-5.2-1.1-7.2-4.3-9.8-15.5-34.1-15.3-41.9.1,1.8,2.1,4.3,1.6,6.6,1.8,5.7.5,9.3-2.4,12-7"
            />
            <path
              className="st0"
              d="M543.5,493.5c-2.8,3.9-1.3,8.4-1.4,12.5-.3,15.8-.1,31.7-.1,47.5,0,21,.2,42-.1,63-.1,7.7-.6,15.3.1,23"
            />
            <path
              className="st0"
              d="M526.5,286.5c-.2.3.4.7.4,1-.2,19.7.7,39.3-.4,59-.1,2.3-.7,4.7.4,7"
            />
            <path
              className="st0"
              d="M1064,610.5c1.2-9.2.1-18.3.7-27.7-4.8.5-8.9,1.6-13.7,1,0,7.3-.3,14,.2,20.6.2,2.4-.4,4.4-.7,6.5"
            />
            <path
              className="st0"
              d="M535.5,502.5c1,2.4.5,5,.5,7.5,0,17.5,0,35,.5,52.5,0,1.6.6,3.4-.5,5"
            />
            <path
              className="st0"
              d="M701.5,679.5c-.6,19.8-.5,39.7-.5,59.5,0,1.9-.7,4.1,1.5,5.5"
            />
            <path
              className="st0"
              d="M434.5,596.5c2.1.7,4.3.5,6.5.5,19.2,0,38.3,0,57.5,0"
            />
            <path className="st0" d="M498.5,684h-64" />
            <path
              className="st0"
              d="M498.5,647c-2.9-1.2-6-.4-9-.5-16.7,0-33.3,0-50,0-1.7,0-3.4.6-5-.5"
            />
            <path
              className="st0"
              d="M543,368.5c6.1,6.4,9.9,14.4,15,21.5,2.2,3,4.3,6,6.5,9,2.6,3.6,3.6,7.6,3.5,12,0,17.3.2,34.7-.1,52-.2,12.5-.3,25,0,37.5.3,11.3-.3,22.7-.9,34"
            />
            <path className="st0" d="M498.5,720h-64" />
            <path
              className="st0"
              d="M498.5,732c-2.8,1.5-5.7-.1-8.5-.1-18.5.2-37,.1-55.5.1"
            />
            <path className="st0" d="M498.5,659h-64" />
            <path className="st0" d="M498.5,708h-64" />
            <path className="st0" d="M498,622h-63.5" />
            <path
              className="st0"
              d="M17.5,785c9.8,0,19.7,0,29.5,0,1.1,0,2.1,0,3-1,4.5-4.3,9.9-5.2,16-5.1,21.7.3,43.3.1,65,.1s15,.1,22.5,0c4.5,0,8.1,1.8,11.5,4.5"
            />
            <path
              className="st0"
              d="M534.5,568c-4.2-9.3-6.8-19.3-11.5-28.5-1.3-2.6-2-5.6-4.7-7.6-1.8,3.5-3.3,6.9-2.9,11.1.8,8.1.3,16.3.2,24.5-.2,13.3-.8,26.7.4,40"
            />
            <path
              className="st0"
              d="M500,401.5c11.9,9,23,19.1,35,28,.7.6.9,1.4.9,2-.3,21.7.7,43.3-.5,65,0,.7.1-.2,0,.5"
            />
            <path
              className="st0"
              d="M479.5,774c-2.7,1.7-5.8,2.4-8.6,3.9-5.7,3-9.6,7-10.2,14.1-12.5,0-24.9,0-37.2,0-3,0-2.8-2.3-3.5-4-3.2-7.9-14.5-15.7-24-14.7-7,.7-13.4,4.7-18,10.7-1,1.3-2.2,2.5-3.8,4.9,15.5.2,30.2,0,44.8,0"
            />
            <path
              className="st0"
              d="M93.5,778.5c1.1-8.5.2-17,.5-25.5,0-2.6-1.9-3.7-3.2-5.2-3.5,1-3.9,3.3-3.9,6.2.1,8,0,16,0,24"
            />
            <path
              className="st0"
              d="M901.5,521c.8,1.6.5,3.3.5,5,0,19,0,38,0,57"
            />
            <path
              className="st0"
              d="M366,606.5c.6,3.7,2.7,4.7,6.5,4.6,16-.4,32,.8,48,.4,1.7,0,3.4.6,5-.5"
            />
            <path
              className="st0"
              d="M116.5,729.5c-5.4,3.7-11.7,4.8-18,4.9-14.5.2-29,.5-43.5,2-4.3.4-5.9-3.5-8-6.4"
            />
            <path className="st0" d="M708.5,677.5c-.4,20.3.6,40.7.5,61" />
            <path
              className="st0"
              d="M535.5,368.5c1.1,4.8.4,9.7.5,14.5.1,12.3,0,24.7,0,37,0,2.8,0,5.7,0,8.5"
            />
            <path
              className="st0"
              d="M716.5,677.5c.3.6-.5.9-.5,1.5,0,18.8,0,37.7,0,56.5,0,.6.8.9.5,1.5"
            />
            <path
              className="st0"
              d="M1147.5,737c.1,2.7-1.7,2.5-3.5,2.5-39.2.7-78.3.6-117.5.4-7.2,0-14.3-.5-21.8,0-1.7-2.8-1.1-6.4-.9-9.4.2-4.6-2.4-5.1-5.3-4.9-10.9.9-21.7.1-32.5,0-9.5-.2-9.5,0-9.5,9.5,0,1.5.7,3.1-.5,4.5"
            />
            <path
              className="st0"
              d="M1023.5,509c-4,1.2-7.9.7-12,.6-10.3-.3-20.6,1-31,0-3.9-.4-9.5,6.6-9.5,10.9.4,22.5-.5,45,.3,67.5.1,4.1,0,8.3-.3,12.5"
            />
            <path
              className="st0"
              d="M365.5,548c-4.2,0-8.3-.6-12.5-.9-8.9-.7-17.7.6-26.5,1.4-5.2.5-10.3,1.5-16,1.6,0,7.3-.5,14.7.2,21.9.3,3.1-1.4,6.1.3,9"
            />
            <path
              className="st0"
              d="M172,544c-4.6,4.8-7.1,11.1-11.5,16-10.7,12-23.3,20.6-40,21.5"
            />
            <path
              className="st0"
              d="M322.5,654c-11.5,1.4-23,.3-34.5.5-7.3.1-14.7,0-22,0"
            />
            <path className="st0" d="M323,727.5c-18.8-.7-37.7-.5-56.5-.5" />
            <path
              className="st0"
              d="M322.5,618c-4.3,1.4-8.7,0-13,0-14.5,0-29,0-43.5,0"
            />
            <path className="st0" d="M322.5,630h-56.5" />
            <path
              className="st0"
              d="M266,642c10.8.8,21.7.6,32.5.4,8-.1,16,.7,24-.4"
            />
            <path className="st0" d="M322.5,667h-56.5" />
            <path
              className="st0"
              d="M322.5,739c-1.6,1.1-3.4.5-5,.5-17.2-.5-34.3-.8-51.5,0"
            />
            <path
              className="st0"
              d="M323,715c2.1-3.3-.5-7.1,1.2-11.4-19.6.3-38.9.9-58.2-.1"
            />
            <path className="st0" d="M322.5,679c-18.8,1.2-37.7-.2-56.5,0" />
            <path
              className="st0"
              d="M266,691c1.6.8,3.3.5,5,.5,17,0,34,0,51,0"
            />
            <path
              className="st0"
              d="M266.5,751c5.2.8,10.3.2,15.5.1,13.5-.3,27,.2,40.5.9"
            />
            <path className="st0" d="M827,533h-55" />
            <path className="st0" d="M827,587h-55" />
            <path className="st0" d="M827,515h-55" />
            <path
              className="st0"
              d="M366.5,529c0,23.2,0,46.3,0,69.5,0,1.7-.6,3.4.5,5"
            />
            <path
              className="st0"
              d="M734,640.5c1.2,7.5.1,15,.5,22.5,1.1,22.2.2,44.3.5,66.5"
            />
            <path
              className="st0"
              d="M723.5,678.5c.8,1.6.5,3.3.5,5,0,14.8,0,29.7,0,44.5,0,1.7-.3,3.4.5,5"
            />
            <path
              className="st0"
              d="M1185,527.5c0,2.9.8,5.6.4,8.7,10.9-2.4,21.3-1,31.6-.7,9.1.3,18,2.4,27,3.4"
            />
            <path
              className="st0"
              d="M175.5,540c4.4.5,7.7,2.2,10.1,6.4,8.4,14.5,21,24.6,35.8,32.2,3.7,1.9,7.7,0,11.1,2.3"
            />
            <path
              className="st0"
              d="M1187,537c0,1.2,0,2.3,0,3.5-.4,5.2-.1,5.6,5.5,5.5,17.3-.4,34.4.9,51.5,3"
            />
            <path
              className="st0"
              d="M1303,644c1.4-1.5,1.2-3.3,1-5-1.3-10.7.5-21.3,0-32,0-2.7-.6-5.3-.9-8.4-11.5.6-22.8.3-34.3.4-1.1,7.3.5,14.7-.8,22"
            />
            <path
              className="st0"
              d="M826.5,420c-1.5,1.3-3.3,1-5,1-13.2-.2-26.4.8-39.5-1-3.1-.4-6,1.1-9,1"
            />
            <path
              className="st0"
              d="M567,594c1.4-6.1.7-12.4.8-18.5,0-10.7-.6-21.3.3-32,.1-1.6-.1-3.1-1.3-4.8,6.5-1.6,12.6-.5,19.1.8.7,12,1.3,24,.2,36.1"
            />
            <path
              className="st0"
              d="M535.5,585.5c1.1,1,.5,2.3.5,3.5,0,13.5,0,27,.5,40.5.1,3-.5,6-1,9"
            />
            <path
              className="st0"
              d="M158,748.5c31.5-1.1,63-.2,95-.6,0,8.6,0,16.6,0,25.2,4.2-1.2,8.1-1,11.5-3.1"
            />
            <path className="st0" d="M773,334.5h53" />
            <path
              className="st0"
              d="M641,784.5c-7.3.9-14.7.9-22,1-3.9,0-7.5,1.2-10.5,3.6-3,2.4-6.3,3.1-10,3-8.2-.2-16.3,0-24.6,0-1.3-5.6-3.7-10.4-9.4-13-12-5.5-33.7-3-37.5,12"
            />
            <path
              className="st0"
              d="M1360,659.5c1.1,7.1.4,14.3.5,21.5.2,10.2,0,20.3,0,30.5"
            />
            <path
              className="st0"
              d="M1129,556.5c.8-2.7,1.5-7-.1-7.7-4-1.6-6.5-6-11.4-5.9-9,.2-18,0-27,0-2,0-4.1,0-5.5,1.6-1.7,2-4,1.7-6.5,2.7,0,5.3,0,10.8,0,16.3,0,27.3,0,54.7,0,82,0,3.2.2,5.9-4.5,5.6-3-.2-3.6,2.5-3.6,5.4.1,20.8,0,41.7,0,62.5"
            />
            <path
              className="st0"
              d="M1310,645c-1.2-7.6,0-15.3-.6-23.5,15.8,1.1,31.4.2,47.2.7,1.1,4.1-.3,8.1.9,11.9"
            />
            <path
              className="st0"
              d="M206.5,703c-11.6,8.6-24.4,11-38.5,8.1-3.3-.7-6-2-8.5-4.1-1.2-1-2.1-2.6-4-2.5"
            />
            <path
              className="st0"
              d="M926,756.5c-8.5-5.7-18.2-6.2-28-6-8.6.2-15.9,3.6-22,9.5"
            />
            <path
              className="st0"
              d="M248.5,712c-2.3,5.7-8,6.6-12.5,6.7-9.8.2-19.7-1-27.9-7.3-.8-.6-1.8-.7-2.7-1.6-2.5,5.6-8.1,5.7-12.8,6.5-8.2,1.4-16.6.8-25,.6-5.2-.1-9.8-2.5-14-5.4"
            />
            <path
              className="st0"
              d="M415.5,542.5c1.1,8,.7,16,.4,24-.4,8.7-.1,17.3-.4,26"
            />
            <path
              className="st0"
              d="M824,272.5c-5.5-1.2-11,0-16.5,0-11.2.1-22.3,0-33.5,0"
            />
            <path className="st0" d="M434.5,671c21.2.2,42.3,1.8,63.5.5" />
            <path
              className="st0"
              d="M682,436c-7.2-3.8-14.9-4.4-23-4.1-13.7.4-27.3.1-41,.1"
            />
            <path
              className="st0"
              d="M667,419c-15,0-30-.2-45,.5-1.5,0-3.1.7-4.5-.5"
            />
            <path className="st0" d="M667,443c-16.3.1-32.7-.3-49,.5" />
            <path
              className="st0"
              d="M667,456c-14.7,0-29.3.3-44,1-1.7,0-3.3-.7-5-.5"
            />
            <path className="st0" d="M667,470c-16.3.6-32.7.6-49,1" />
            <path className="st0" d="M667,514c-16.3.1-32.7.8-49,.5" />
            <path
              className="st0"
              d="M667,484c-1,.4-1.9.5-3,.5-15.3,0-30.7.8-46,.5"
            />
            <path
              className="st0"
              d="M1461.5,649.5c-4-2.8-5.8-7.4-9.4-10.6-10.6-9.5-22.8-12.6-36.6-9.9"
            />
            <path className="st0" d="M1070.5,739.5c0-4.3,0-8.7,0-13.5h56" />
            <path
              className="st0"
              d="M131,697c14.5.7,29-1.4,43.5-1.3,8.3,0,16.7,0,25,.3,2.1,0,3.3.7,4.6,2.5,8.9,13.3,22.6,15.3,36.9,14.3,4-.3,9.7.9,12-4.7,0-.1,0-.3,0-.5"
            />
            <path
              className="st0"
              d="M238.5,577.5c-5.8,6.9-12.1,13.2-22,12.9-6-.2-12.1-.8-16.5-5.9-1.2-1.3-2.2-2.8-4.4-3.8-.9,8.4-2.2,17,0,24.6,2,7.2,5.3,15.2,12.1,20,5.1,3.6,11.1,4.8,17.4,4.7,4.3,0,8.7-.2,13,.3,3,.4,5.1-2.2,7-4.4"
            />
            <path
              className="st0"
              d="M819.5,773.5c-1.1-16.8-.4-33.7.1-51.1-.6-1-2.2-.3-3.6-.3-10.7,0-21.3,0-32,0-3.1,0-4.1,1-4.1,4.1.1,12.8,0,25.7,0,38.5,0,1.6.6,3,.5,4.5"
            />
            <path
              className="st0"
              d="M1014,760.5c-11.9-14.4-36.7-14.9-47.5-9.5-2.4,1.2-5,2-5,5.5,0,7.5,0,7.6,8,7.5,12-.2,24-1,36-1"
            />
            <path
              className="st0"
              d="M618,499.5c12.8,1.4,25.7-.2,38.5,0,3.5,0,7,.3,11-.5,0-5.1,0-10.3,0-15.5,0-25.2,0-50.3,0-75.5,0-.8.6-1.3.5-2"
            />
            <path
              className="st0"
              d="M203,660c-9.9,11.6-24.8,12.9-37,7.6-3.8-1.6-5.5-5.3-9-7.1"
            />
            <path className="st0" d="M776.5,223.5c15.2.2,30.3-.5,45.5.5" />
            <path
              className="st0"
              d="M253.5,667.5c-2.4.9-4.5,2.5-5.9,4.5-3.3,4.6-8.3,4.8-13,6-10.8,2.8-19.9-1.3-29-6.1-2.8-1.5-5.5-1.4-8.5-.5-9.3,2.6-18.8,3.8-28.5,2.6-2.2-.3-5.1-.4-6.3-1.3-4.8-3.4-7.9-.5-11.7,1.6-10.8,6.1-22.5,7.1-34.4,4.57:44 PM-5-1.1-7.3-6.3-11-9.4-.5-.4-.7-1.1-1.5-1"
            />
            <path
              className="st0"
              d="M293.5,789c-8.9.3-18,3.5-26.6-2.4-3.3-2.2-7.7-2.3-11.9-1.7-2.1.3-4.5.8-6.5-.9"
            />
            <path className="st0" d="M731.5,677.5v54" />
            <path
              className="st0"
              d="M161.5,616c-8,14.4-24.3,16.2-38,14.4-1.8-.2-3.3-.2-5,.1"
            />
            <path
              className="st0"
              d="M543,435.5c-1.1,3.8-.3,7.7-.5,11.5-.7,15.2-.8,30.3.5,45.5"
            />
            <path
              className="st0"
              d="M1031,601c-9.6-2.3-19.3,0-29-.5-5.5-.3-11,0-16.5-.5-7.4-.7-14.5.5-21.5,3"
            />
            <path
              className="st0"
              d="M187.5,747.5c0-5.3.1-10.7,0-16-.1-3.5-3.2-6.9-5.9-6.4-3.8.6-4.7,3.4-4.6,6.9.2,4.5,0,9,0,13.5"
            />
            <path
              className="st0"
              d="M581,606.5c-5.5,3-9.5,7.9-13.9,12.1-9.3,8.9-19.4,17-28.5,26-4.7,4.7-7.4,11-10.8,16.8-3.5,5.9-5.7,12.7-10.9,17.6"
            />
            <path className="st0" d="M972,588c17.2.9,34.3.3,51.5,0" />
            <path
              className="st0"
              d="M200.5,655c5.1,8.8,11.3,15.9,22,18.1,5.6,1.2,11,1.1,16.5.3,2.2-.3,4.3-.6,6.5,0"
            />
            <path
              className="st0"
              d="M1185,535.5c-6.9,1-13.8,1.8-20.5,3.6-6.6,1.8-7.9,5.4-4.5,11.9,7.7-2.2,15.5-3.7,23.5-4.4,1,0,1.9,0,2.5-1"
            />
            <path
              className="st0"
              d="M617,528c0-40.5.5-81-.6-121.6,16.8-2.2,33.2-1.1,49.6-1.4,3.7,0,5.6,3.1,8.5,4.5,6.5,3.2,8.4,7.6,8.4,15.5,0,24.8-.1,49.7,0,74.5.2,29.2,0,58.3,0,87.5,0,1.9.6,3.9-1,5.5"
            />
            <path
              className="st0"
              d="M1003,731c-12,2-24,.6-36,1-2.2,0-4.3,0-6.5,0"
            />
            <path
              className="st0"
              d="M1250,764c.7-4.8-1.5-8.4-6-8.9-3-.3-6.2-.6-9,.9-2.7,1.5-4.5,1.3-6.6-1.4-2.9-3.8-11.4-3.2-14.9.4-1.8.1-2.2-1.8-3.5-2.5-3.1-1.6-6.9-2.1-8.8.6-3.2,4.5-7.2,7-12.2,8.4-5.8,1.6-7.4,5.5-6.5,11"
            />
            <path
              className="st0"
              d="M114,710c1.7,1.9,4.1,2.3,6.5,2.5,12,1.3,23.6,1.5,33-8,2.7-2.7,5-4.7,3.8-9.6-1.3-5.3-.3-11.3-.3-16.9s.2-4,0-6c-.6-4.2-3.7-6.2-6.9-3.9-6.3,4.3-13.6,4.3-20.5,6-6.3,1.5-12.7.8-19,.5"
            />
            <path
              className="st0"
              d="M55,737c2,3.6,5.9,2.4,8.5,2.3,10.2-.5,20.4.3,30.5-.8,6.2-.6,12.5-.3,18.5-2.4,1.9-.6,3.2-1.9,5-2.6,2,.4,2,1.9,2,3.5.3,13.2.6,26.3.5,39.5"
            />
            <path
              className="st0"
              d="M392.5,773.5c-3.6-3.3-7.8-1.6-11.5-.9-9,1.7-17.3,5-22.5,13.4-.9,1.5-1.9,3.1-1.5,5"
            />
            <path
              className="st0"
              d="M224,747c.3-5-.3-10-.9-15-.3-2.3-1.4-3.9-3.6-3.9-2.1,0-3.4,1.5-3.5,3.9-.2,5-1,10-1,15"
            />
            <path
              className="st0"
              d="M936.5,785c-8.5.8-17,.5-25.5.5-8.5,0-17,.2-25.5-.5"
            />
            <path
              className="st0"
              d="M1467,710c7.6,1.1,15.4.6,23,1.5,1.6.2,3.1.2,5,1.3,0,13,0,26.4,0,39.7,0,4.8.3,9.7-.5,14.5"
            />
            <path
              className="st0"
              d="M541,644.5c12.9,11.5,25.4,23.3,39.1,33.9,2.1,1.7,1.9,2.8.9,4.6"
            />
            <path
              className="st0"
              d="M1072,611.5c1.1,11.3.2,22.7.5,34,0,1.8-.4,3.7.5,5.5"
            />
            <path
              className="st0"
              d="M924,732c-11.5,0-23,0-34.5,0-1.7,0-3.4-.3-5,.5"
            />
            <path
              className="st0"
              d="M1467.5,696.5c9.2,1,18.3,2,28.1,3-.5,4,.5,8-.6,12"
            />
            <path className="st0" d="M934.5,616c-12.8.7-25.7.5-38.5.5" />
            <path className="st0" d="M934.5,626h-38.5" />
            <path className="st0" d="M934.5,608h-38.5" />
            <path
              className="st0"
              d="M1481.5,678.5c-3.7-2.1-6.8-.3-10,1.5-6,3.3-11.8,7.2-17.6,10.8-2,1.2-1.7,2.3-1.9,3.7-1.1,14-.4,28-.5,42,0,7,0,14,0,21"
            />
            <path className="st0" d="M1259,643v-46c-4.3-1.3-8.7.7-13,0" />
            <path
              className="st0"
              d="M666.5,527c-10.6.9-21.3,1.2-32,1.4-15,.3-30,.9-45,.6-.7,0-1.5-.3-2.5,1.3,0,2.1.2,5.2-1,8.1"
            />
            <path className="st0" d="M63,740c.7,12.7-1,25.3-1,38" />
            <path
              className="st0"
              d="M1087.5,543c.2-3-.5-6,.6-9.5,10.5,0,21.2,0,31.8,0,.5,3.5,1.8,6.4.6,9.5"
            />
            <path
              className="st0"
              d="M500,469c11.4,8.7,22.2,18.2,33.5,27,3.5,2.7,3.2,3.5,0,7-8.5,9.4-16.9,18.7-25.5,28-2.6,2.8-5,5.7-8,8"
            />
            <path
              className="st0"
              d="M517,682.5c14.6,15,27.6,31.4,42,46.5,7.5,7.9,14.4,16.3,22,24"
            />
            <path className="st0" d="M818,759.5c-12.5-.5-25-.5-37.5-.5" />
            <path
              className="st0"
              d="M184,651c0-4.2.3-8.4,0-12.5-.3-2.9-2.3-4.8-5.4-4.5-2.8.3-3.6,2.3-3.5,4.9,0,3.8.4,7.7-.5,11.5"
            />
            <path
              className="st0"
              d="M120,734.5c5.5,3.6,11.7,4.7,18,5,8.7.4,17.4,2.1,26-.9,1-.3,1.8-.5,2-1.6-11.4-2.8-21.8-7.1-28.1-17.9"
            />
            <path
              className="st0"
              d="M818,739.5c-7.1,1.1-14.3.3-21.5.5-5.2.1-10.3,0-15.5,0"
            />
            <path className="st0" d="M818,730c-12.3,0-24.7,0-37,0" />
            <path
              className="st0"
              d="M818,749c-9.5.5-19,.8-28.5,0-2.8-.2-5.7-.2-8.5.5"
            />
            <path
              className="st0"
              d="M184,605c0-3.5,0-7,0-10.5,0-2.8-.5-5.4-4-5.4-3.4,0-4.9,2.3-5,5.4,0,3.5,0,7,0,10.5"
            />
            <path
              className="st0"
              d="M182.5,543.5c-2,6.3,2.3,11,4.7,15.9,2,4.2,4.9,8.2,9.3,10.7,1.5.9,2.4,2.6,3.1,4.4,5.4,12.6,18.1,13,26.4,10.4,1.9-.6,3.7-.8,5.5-.9"
            />
            <path
              className="st0"
              d="M184.5,695.5c0-3.7-.1-7.3,0-11,.1-3-.9-5.1-4-5.5-2.6-.3-5.4,2.5-5.5,5.5-.1,3.5,0,7,0,10.5"
            />
            <path
              className="st0"
              d="M1477,760v6l-12.5,5c-2.8-2.1-7.6-.5-9.2-5.4-.7-2-3.8-.8-5.8-1.1"
            />
            <path
              className="st0"
              d="M1283,668c5.5,3.4,11.8,4.9,17.6,7.2,12.1,4.8,23.9,9.6,34.4,17.3.3.2,1,0,1.5,0"
            />
            <path className="st0" d="M535,434c-11.9,10.7-22.5,22.9-35,33" />
            <path
              className="st0"
              d="M543,501.5c6,5.4,9.1,12.8,13.9,19.1,3.7,4.8,5.5,11,10.6,15,.5.4-.4,1.8.5,2.4"
            />
            <path
              className="st0"
              d="M198,573c-2.7,1-4.8,2.8-7,4.5-8.9,6.6-16.4,6.1-24.5-1.5-.8-.7-1.1-2-2.5-2"
            />
            <path
              className="st0"
              d="M734,674.5c-8.3-.7-16.7-.6-25-.4-4.2,0-8.4-.6-12.5.4"
            />
            <path
              className="st0"
              d="M199.5,617c-5.4,3.5-10.3,8.3-17.5,7-6.8-1.2-13.6-2.4-18.5-8-.7-.8-1.7-1.3-1.1-3,3.3-9.3,2.8-18.9,2.1-28.5,0-.8,0-1.7,0-2.5"
            />
            <path
              className="st0"
              d="M1201,752.5c-4.4-2.2-9-.9-13.5-.9-13.2.2-26.3,1.6-39.5,1.4"
            />
            <path className="st0" d="M580,684.5c-10,11-19.8,22.3-29.5,33.5" />
            <path className="st0" d="M927,583.5v-54.5c-4.3,0-8.2,0-12,0" />
            <path
              className="st0"
              d="M549,720c-9.7,10.2-18.2,21.5-27.9,31.6-.2.2-.8.8-.6,1.4"
            />
            <path
              className="st0"
              d="M1251.5,763c.2.2.4.5.5.5,6.8-2,9.9,2,11.8,7.7,5.8-2.8,13.2.5,17.7-5.7"
            />
            <path
              className="st0"
              d="M164.5,618.5c-2.3,6.2-.6,8.6,6,10.6,6.1,1.9,12.1.3,18-.3,2.7-.3,5.3-.5,8-.8"
            />
            <path className="st0" d="M544.5,435c7,11.2,13.9,22.4,22.5,32.5" />
            <path className="st0" d="M1205,401c-.9,11-1.6,22-.5,33" />
            <path className="st0" d="M1181.5,769.5c-11,0-22,.2-33-.5" />
            <path
              className="st0"
              d="M1181.5,761.5c-7.5,1.1-15,.3-22.5.5-3.5.1-7,0-10.5,0"
            />
            <path
              className="st0"
              d="M197.5,608.5c3-2.1,6-.4,9,0,1.3.2,2.6.5,4,.5,4.8.1,8.9.7,11.2,6.4,2.4,5.9,8.1,9.5,14.3,10.4,4,.6,8.5-.1,12.5-1.8"
            />
            <path
              className="st0"
              d="M123.5,729c2.7,2.9,6.1,4.2,10,5.1,7.3,1.6,14.6,2.9,22,.9"
            />
            <path
              className="st0"
              d="M1179.5,741.5c-8,1.2-16,1.6-24,2.4-2.5.2-4.9,1.4-7.5,1.1"
            />
            <path
              className="st0"
              d="M1336,772.5c2.3-5.6,6.1-8.7,12.5-7.5,2,.4,3.8-.7,4.9-2,4.7-5.2,13.4-6.2,18.5-1.9,1.1.9,2,2.7,3.5,2.4,7.5-1.5,11.5,3.7,16,8.1,4.6-1.6,9-5.5,13.8-.9,2-1.1,3.2-2.8,4.7-4.1,1.1-1,2.5-1.7,4-2,2.6-.4,5,.9,7.5,1,2.7,0,4.6-2.1,7.5-2.2,3.9-.2,6.3,2.3,9.5,3.2"
            />
            <path
              className="st0"
              d="M1446,659.5c2.9,4.2,2.7,9.3,4.1,14,1.7,5.6,0,11.5,1.9,17"
            />
            <path
              className="st0"
              d="M818,768.5c-12,1-24,0-36,.9-.9,0-1.8-.5-2.5.6"
            />
            <path className="st0" d="M1360,726v31.5" />
            <path className="st0" d="M1387,726v31.5" />
            <path className="st0" d="M1179.5,721.5c-10.5,1.2-20.7,3.5-31,5.5" />
            <path
              className="st0"
              d="M651.5,773.5c-4.8-2.1-10-2.2-15-3.3-3.1-.7-6.3-1.6-9.4-2.3-2.6-.6-4.4-.5-5.5,2.1"
            />
            <path className="st0" d="M203,714.5c.9,11,.5,22,.5,33" />
            <path className="st0" d="M1429.5,727c.3,10.2-.6,20.3.5,30.5" />
            <path
              className="st0"
              d="M266,715c12.5,0,25,.9,37.5.4,5.5-.2,11-.3,16.5-.5,3,0,3.8.5,3.7,4-.4,13-.2,26-.2,39"
            />
            <path
              className="st0"
              d="M157,741c-.4,11,1,22,1,33,0,1.7.3,3.4-.5,5"
            />
            <path
              className="st0"
              d="M162.5,571.5c.3.5,1.1.7,1,1.5-.5,7.8,1.3,10,9,12.1,6.4,1.7,12.5.3,18.5-1.6,1.2-.4,2.2-1.1,3.5-1"
            />
            <path className="st0" d="M565.5,540c-7.6,9.6-14.5,19.7-22.5,29" />
            <path
              className="st0"
              d="M684,607.5c2.7-.2,5.3.2,8-.4,2.1-.5,4.8.2,5.9,2,2.9,4.7,6.9,8.6,10.8,12.2,3.8,3.5,3.3,7.2,3.3,11.2,0,9.2,0,18.3,0,27.5"
            />
            <path
              className="st0"
              d="M1335.5,776.5c.2-.8,1.1-2,.5-2.4-3.8-2.5-7.6-5.4-12.4-5-2.2.2-2.8.4-4.2-2-3.6-6-10.7-7.2-16.8-8.9-3-.8-6.7,1.1-8.6,4.9-4.1-1.9-8.6-.6-12.8-.4-6.8.3-13.7-.4-20.5.3"
            />
            <path className="st0" d="M1045.5,612c-.6,9.7-.5,19.3-.5,29" />
            <path
              className="st0"
              d="M572,789c-7.7.6-15.3,1.3-23,.9-5.7-.3-10.7,2.9-16.5,2.3-7.1-.8-14.3-.3-21.5-.1-2.2,0-4-.3-5-2.5"
            />
            <path
              className="st0"
              d="M164,607c-6.2.3-12.4,1.8-18.5,2.3-4.6.4-6.4,2.4-8.7,6.1-4,6.5-10,10.9-18.3,10.6-1.2,0-2.1.3-3,1"
            />
            <path
              className="st0"
              d="M111,710c-1.9,3,1.7,3.5,2.6,3.8,13.3,4.7,26.6,7.4,39.4-1.3"
            />
            <path
              className="st0"
              d="M135,775.5c0-7.2.1-14.3,0-21.5,0-2.7.4-4.8,3.3-6.3,4.5,4.2,1.2,9.6,2.1,14.3.9,4.7.3,9.6-.3,14.5"
            />
            <path className="st0" d="M1446.5,729c.6,9.5.5,19,.5,28.5" />
            <path
              className="st0"
              d="M173,543.2c.7,7.1-3.5,12.6-6.7,18.2-2.5,4.3-4.3,9-7.3,13.1-4.5,6.2-9.6,10.5-18,10.7-5,.1-10-.8-15,0-3.8.7-5.7-2.6-7-5.8"
            />
            <path
              className="st0"
              d="M1466,663.5c4.8,3.7,10,6.9,15,10.4,4.6,3.2,5.8,7.4,5,12.6"
            />
            <path className="st0" d="M887,563h-33.1c.3,3-.3,5.5.6,8" />
            <path
              className="st0"
              d="M163,625c-11.7,9.3-24.5,13.6-39.6,9.2-3.7-1.1-5.3-3.9-7.7-5.9-1.3-1.1-2.7-2.3-4.2-3.2"
            />
            <path className="st0" d="M421,602c0-2.8,0-5.7,0-9h-40q-8,0-8,8" />
            <path
              className="st0"
              d="M1077.5,610c-5.6,1.1-11.4,1-17,1.9-5.1.8-10.3-.7-15.5-.3-2,.1-4.1-.5-6,.4-.2,9.2.4,18.4-.5,27.6"
            />
            <path
              className="st0"
              d="M1195.5,428.5c-.6-4.8,1.5-10.1-2-15.1-3.5,4-1.4,8.3-2,12.1"
            />
            <path className="st0" d="M233,720c0,9,1.1,18,1,27" />
            <path
              className="st0"
              d="M1069.5,692h-9.6c-1.9,8.1-.6,16.3-.4,24.5"
            />
            <path
              className="st0"
              d="M845,740.5c10.8-2.2,21.7-.3,33-1.2,0-4.1,0-8.5,0-12.6,5.6-2.9,11.3,0,16.5-1.7"
            />
            <path className="st0" d="M1263.5,666c-1.1,9-.2,18-.5,27" />
            <path className="st0" d="M1281.5,667.5c-.3,9,.6,18-.5,27" />
            <path className="st0" d="M1494,728.5c-9-.6-18-1.6-27-2.5" />
            <path
              className="st0"
              d="M223,636c0,2.3.2,4.7,0,7-1.1,13.4,6.8,20.5,17.5,26.1,2.6,1.4,5.5-.3,7.6,1.9"
            />
            <path
              className="st0"
              d="M1066.5,719.5c18.8,0,37.7,0,56.5,0,4.1,0,8,.8,12,1.5"
            />
            <path
              className="st0"
              d="M336,789c-3.3,1.1-6.8.9-10,.3-5.6-1-11.1.6-16.5-.3"
            />
            <path
              className="st0"
              d="M135,637c0,3.2-.3,6.4,0,9.5.6,6-1.9,10.8-5.6,15-4.5,5.1-9.7,9.2-16.9,9.5-.9,0-1.5.4-2,1"
            />
            <path className="st0" d="M1467.5,740c8.8.7,17.7,1,26.5,1.5" />
            <path className="st0" d="M178,504.5c-.5,8.8-3.1,17.2-3.5,26" />
            <path
              className="st0"
              d="M560,757.5c1.5,2.1,4,1.6,6,1.9,17.9,2.9,35.7,6.9,53.4,10.7,8.1,1.8,16.4,3.5,24.1,7.2,4,2,6-1.7,8.5-3.9"
            />
            <path
              className="st0"
              d="M1450.5,728c-7.7-.5-15.4-1.4-23-2.4-12.9-1.7-26-1.2-39-.7-9.8.4-19.7.1-29.5,0-7.2,0-14.3.4-21.5,1"
            />
            <path
              className="st0"
              d="M567,407c-7.3,6.5-14.6,13.1-21.5,20-2.1,2.1-3.4,4.4-2,7.5"
            />
            <path
              className="st0"
              d="M1322,668c-.6-6.8-1.5-13.6-.9-20.9-8.9-.8-17.1-2.9-25.6-3.1-2.4,0-4.8.2-7-1"
            />
            <path
              className="st0"
              d="M147.5,694.5c.2-2.2-.7-4.3-.5-6.5.1-2-.7-3.8-3-3.9-3.2-.1-1.9,2.5-1.9,3.9-.2,3-.2,6,.4,9"
            />
            <path
              className="st0"
              d="M1039.5,717c8-.8,16-.6,24.3.2.7,7.6-.4,15,.7,22.3"
            />
            <path
              className="st0"
              d="M1179.5,416.5c.5.3.6.7.5,1-1.2,9-1.3,9.1,6.5,12.4,1.6.7,3.4,1.5,4.9,2.3,8.7,4.6,14.7,4.3,22.1-1.7,3.1-2.6,7-1.9,10.5-3"
            />
            <path className="st0" d="M202,671.5c-.2,8,1.1,16-.5,24" />
            <path
              className="st0"
              d="M238,631c-5.8,5-12.8,4.6-19.5,3.8-6.4-.8-12.9-2.4-17.6-7.8-.8-.9-1-.8-3.5.3,0,8.5,0,16.9,0,25.2"
            />
            <path
              className="st0"
              d="M252.5,773c-5.3,2.1-11.1,2.3-16.7,4.4-.8,2-.1,4.6-.3,7.1"
            />
            <path className="st0" d="M711,633.5c-11-.9-22-.3-33-.5" />
            <path className="st0" d="M567,470c-7.9,7.3-14.6,15.8-22.5,23" />
            <path className="st0" d="M161,628.5c1,8,1.4,16,0,24" />
            <path className="st0" d="M548,354h-20.6c-1,6.6-1.5,13.3-.4,20" />
            <path
              className="st0"
              d="M1316,622.5c-1,5.8-.4,11.7-.5,17.5,0,2,.4,4.1-.5,6"
            />
            <path className="st0" d="M1300.5,676c-.3,7.7.6,15.4-.5,23" />
            <path
              className="st0"
              d="M887,550c-3.8-.3-7.3,1.4-11.2,1.5-.9,3.4.4,7-.8,10.5"
            />
            <path
              className="st07:48 PM"
              d="M1371.5,759c6.8-1,13.7-.5,20.5-.5,23.5,0,47,.2,70.5-.6,5.7-.2,11.2,1.8,17,1.2,2.1-.2,3.7,1.2,3.5,3.9,0,1.1-.6,2.5.4,3.5"
            />
            <path
              className="st0"
              d="M162.5,582c-9.6,7.1-20.6,8-32,6.9-1.7-.2-4.1-.7-5-2.9"
            />
            <path className="st0" d="M885.5,764.5c13.2-.2,26.3.5,39.5-.5" />
            <path
              className="st0"
              d="M324,583c-1.1,4.6-.9,9.4-.4,14,1.1,10-.7,20-.2,30,.4,8,.2,16,.3,24,0,8-.2,16-.3,24,0,8.5,0,17,0,25.5,0,1,.6,2.1-.5,3"
            />
            <path className="st0" d="M111,738c0,6.8-.9,13.7-.5,20.5" />
            <path className="st0" d="M687,623h20.5" />
            <path
              className="st0"
              d="M682,574.5c-7.6-6.3-16.7-1.7-25-3.4-2.9-.6-6,0-9,0"
            />
            <path
              className="st0"
              d="M1244.5,645c-2.8,1.4-6.1,1.2-9,2.1-4.1,1.2-8.2,3.2-12.2,4.5-5.6,1.8-11.4,3.9-17.4,4.3-.6,0-.9.8-1.5.5"
            />
            <path className="st0" d="M963,765v19.5" />
            <path
              className="st0"
              d="M1056.5,739.5v-14.2c-8.3-1.2-16.7.2-25,0-7.3-.2-14.7.3-22,.3-2.1,0-4.3-.2-6,1.5"
            />
            <path className="st0" d="M667,541c-6.5.7-13,1.1-19.5,1" />
            <path
              className="st0"
              d="M682,561c-1.3.6-2.1-.5-3-1-7.3-4.3-15.1-3.7-23-3-2.8.2-5.7,0-8.5,0"
            />
            <path
              className="st0"
              d="M204.5,697c8.2-1,16.3.5,24.5,1.1.7,0,2,.3,2.5,1.4,3.2,6.3,9.9,7.6,15.5,10.5"
            />
            <path className="st0" d="M141,590c.4,6.3,1,12.6,1,19" />
            <path
              className="st0"
              d="M155.5,713.5c-1.2,4.5-.2,9-.5,13.5-.1,1.8.2,3.7-.5,5.5"
            />
            <path className="st0" d="M724,641c-1.4,6.3.8,12.7,0,19" />
            <path className="st0" d="M677,573.5c-.4,6.4-1.8,12.8,1,19" />
            <path
              className="st0"
              d="M1477.5,767c1.8.9,3.7.7,5.5,0,6-2.6,11.7-.2,16.9,1.7,4.2,1.6,8.1,4.6,11.1,8.2.4.5,1.3.7,1.4,1.6"
            />
            <path className="st0" d="M648,566.5c6.2.3,12.4-.6,18.5.5" />
            <path
              className="st0"
              d="M1309.5,759c11.5-1,23-.4,34.5-.5,3.5,0,7-.7,10.5.5"
            />
            <path
              className="st0"
              d="M131,681c.2,2.9-.7,5.6-.5,8.5.1,3,.8,6.5-1.1,8.9-3.3,4.1-7.2,7.8-12.4,9.6-5.5,1.8-5.6,1.8-10.5-1.5"
            />
            <path className="st0" d="M75,740c0,5.8.2,11.7-.5,17.5" />
            <path className="st0" d="M215.5,591.5c.8,5.8.4,11.7.5,17.5" />
            <path className="st0" d="M228.5,680c0,5.8,0,11.7,0,17.5" />
            <path
              className="st0"
              d="M1466,684.5c1.2,8.6.5,17.3.4,26,0,9.8-.5,19.6.3,29.5.5,5.7,0,11.6-.2,17.5"
            />
            <path
              className="st0"
              d="M961,755.5c-1.8-.2-3,.8-4,2-2.7,3.2-6.1,3.7-10,3.6-6.9-.3-14.1,1-21-5.3v28.8"
            />
            <path className="st0" d="M548.5,357.5c1.6,5.5,1.3,11,0,16.5" />
            <path
              className="st0"
              d="M178,514.5c1.3,2.9,1,6,1,9,0,3,.1,6,2,8.5"
            />
            <path
              className="st0"
              d="M153,652c-.4-4,1.8-9-4.2-11.3-4,3.7-2.2,8.1-1.8,12.3"
            />
            <path className="st0" d="M778,758c-6.1-7.9-14.3-10.5-24-9.5" />
            <path className="st0" d="M944,549c-5.3.7-10.9.3-16,2.5" />
            <path
              className="st0"
              d="M753,741c-5.9-4.7-11.7-8.7-20-8.8-4.7,0-8.5,1.2-12.5,2.9-2.5,1.1-4.7,3-7.5,3.4-8.2,1.4-11.9,5.7-12,14,0,.7.3,1.5-.9,2.2-2.4.1-5.1-1.5-8.2.1-2.6,1.4-4.8,2.9-5.9,5.7"
            />
            <path
              className="st0"
              d="M676.5,761c-6.6,2.2-10.7,6.9-13.5,13-3.6-1.3-7.3-.2-11-.5"
            />
            <path
              className="st0"
              d="M555.5,778c-4.9,2.3-9.1,5.3-12.6,9.5-.8,1-.9,1.6-.4,2.5"
            />
            <path className="st0" d="M953,770h-15.5" />
            <path className="st0" d="M667.5,499.5c4.5,2.6,9.7,3.7,14.5,5.5" />
            <path
              className="st0"
              d="M156,607c-.7-2.3-.5-4.7-.5-7,.1-3.9,0-4.3-4.3-6.1-1.9,4.7-1.4,9.4-.7,14.1"
            />
            <path
              className="st0"
              d="M207,608c.7-4.8,1.5-9.6-1.1-14-4.1.4-5.2,2.5-4.9,6,.2,2.3,0,4.7,0,7"
            />
            <path className="st0" d="M668,541.5c4.5,2,8.8,4.7,14,5" />
            <path className="st0" d="M668,484.5c4.5,2.4,9,4.4,14,5.5" />
            <path className="st0" d="M668,514.5c4.9.9,9.1,3.7,14,4.5" />
            <path className="st0" d="M668,470.5c4.5,2.2,9.1,4.3,14,5.5" />
            <path
              className="st0"
              d="M1303.5,699.5c-.4,7-.7,14-.4,21,0,1.7.7,3.3-.1,5"
            />
            <path className="st0" d="M668,456.5c4.9,1.5,9.1,4.6,14,6" />
            <path className="st0" d="M668,443.5c4.8,1.5,8.9,4.9,14,5.5" />
            <path className="st0" d="M668,419.5c5,.9,9.1,4.2,14,5.5" />
            <path
              className="st0"
              d="M885,756.5c0,9.3,0,18.7,0,28-3.1,1.1-5.8,1.6-8.5.5"
            />
            <path
              className="st0"
              d="M1209,656.5c2.1,2.6,5.5,2.8,8,4.5,1.9,1.3,4.5,1.5,5.5,4"
            />
            <path className="st0" d="M499,583.5c1,8.7.2,17.3,0,26" />
            <path
              className="st0"
              d="M217.5,696.5c1.2-7.5.9-9-3.2-13.8-4.3,3.9-1.4,8.9-2.3,13.3"
            />
            <path
              className="st0"
              d="M668,501.5c-1.1,12.8-.3,25.7-.5,38.5-.1,8.7.2,17.3-.2,26,0,1.7.6,3,.7,4.5"
            />
            <path className="st0" d="M668.5,528c4.4,1.9,8.9,3.4,13.5,4.5" />
            <path
              className="st0"
              d="M1145,757c-1.7,2.7.1,5.3,0,8-.1,2.2.5,4.4-.5,6.5"
            />
            <path
              className="st0"
              d="M223,654c-4,.3-8,.4-12,.3-11.7,0-22.9-3.5-34.5-3.3-4.8,0-9.6,1.5-14.5,1"
            />
            <path className="st0" d="M1006.5,755.5c-.8,9.5-.4,19-.5,28.5" />
            <path className="st0" d="M1025.5,514.5c-.8,4.1,0,8.4-1,12.5" />
            <path className="st0" d="M1157,411c-1,3.9-.2,8.1-1.5,12" />
            <path
              className="st0"
              d="M160.5,652.5c-6.7-.1-13.4.7-20,2.1-2.1.4-4,.4-6,0"
            />
            <path className="st0" d="M1039,724.5v-6.9q-7.2-1-7,6.9" />
            <path
              className="st0"
              d="M499,635.5c1.3,5.5.3,11,.4,16.5.3,13,.1,26,0,39,0,1.9.6,3.9-1,5.5"
            />
            <path
              className="st0"
              d="M681,595.5c3.4,3.9,1.7,8.6,2,13,.2,3.7-.7,7.5,1,11"
            />
            <path className="st0" d="M1179,426c-4,2.1-7.8.7-11.5-1" />
            <path className="st0" d="M695,608c-1.9,4.4-6.6,6.5-9,10.5" />
            <path
              className="st0"
              d="M211.5,653.5c-.3-4.5,1.6-9.7-4.3-12.7-3.8,3.6-1.6,8.2-2.2,12.2"
            />
            <path className="st0" d="M1189,686.5c1.2,3.6.2,7.3.5,11" />
            <path className="st0" d="M896,583.5c5.8.2,11.6,1.9,17.5.5" />
            <path
              className="st0"
              d="M952.5,761.5c3.3,4.3.8,9,.8,13.5,0,3-.2,6-.3,9"
            />
            <path className="st0" d="M535.5,568.5c1.5,3.4.5,7.1,1.5,10.5" />
            <path
              className="st0"
              d="M165,606.5c8.8-.6,17.7-1.6,26.5.4.9.2,2.1.6,3-.4"
            />
            <path className="st0" d="M1214,419.5c.1,3.2-.3,6.3.2,9.5" />
            <path className="st0" d="M927,777.5h9" />
            <path className="st0" d="M1121,545.5c.3,3-1.3,6,0,9" />
            <path className="st0" d="M706.5,608c-.3,2.8.6,5.7-.5,8.5" />
            <path className="st0" d="M1182.5,753c.3,3.5-.6,7,.5,10.5" />
            <path className="st0" d="M499.5,751.5c5.3.8,10.6,1.9,16,1.5" />
            <path className="st0" d="M684.5,620.5c-1.5,2.3-4.1,3-6.5,4" />
            <path className="st0" d="M1087,555c-2.4,1.2-5.4,1.1-7.5,3" />
            <path className="st0" d="M1014.5,776h-7.5" />
            <path className="st0" d="M1043,709.5c5,0,10,0,15,0" />
            <path className="st0" d="M925,727c-.5,6.2.7,12.4-.5,18.5" />
            <path className="st0" d="M1147,739.5c1.4,5.3-.6,10.7,0,16" />
            <path className="st0" d="M786.5,770c1.5,2.3,4.5,2.8,6,5" />
            <path className="st0" d="M1147.5,760.5c0,4.7,0,9.3,0,14" />
            <path className="st0" d="M1031,587.5c-2.1.7-4.3.5-6.5.5" />
            <path className="st0" d="M1328.5,676.5c1.4,2.6,4.1,4,5.5,6.5" />
            <path className="st0" d="M978.5,526.5c-2.4.2-4.2,1.9-6.5,2.5" />
            <path className="st0" d="M1025.5,528c1.9.9,3.5,2.2,5.5,3" />
            <path className="st0" d="M181,536c-4.6-1.1-6.7,1-7,5.5" />
            <path className="st0" d="M1079,720.5c-1.1,1.6-.2,3.3-.5,5" />
            <path className="st0" d="M1445.5,714c1.4,1.4,3.4,1.2,5,2" />
            <path className="st0" d="M1033.5,639.5c2.4,1.2,5.3-.4,7.5,1.5" />
            <path className="st0" d="M678,609c1.4.2,2.5,1.3,4,1" />
            <path className="st0" d="M845,642.5h4" />
            <path className="st0" d="M126.5,722.5c-3.6,1.4-2.2,6.1-5,8" />
          </svg>
        </div>

        {/* Second SVG - Dubai */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0"
          id="svg2-container"
        >
          <svg
            ref={svg2Ref}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1536 1024"
            className="w-full h-full"
            style={{ maxWidth: "100%", maxHeight: "100vh" }}
          >
            <defs>
              <style>
                {`
                .st0 {
                  fill: none;
                  stroke: #000;
                  stroke-miterlimit: 10;
                }
              `}
              </style>
            </defs>
            <path
              class="st0"
              d="M603,93c.3-.1,1.2-1.2,1.9-1.4l-.9-52.1,2-1.5,2,107h5s0,63.5,0,63.5c0,.2,1.5,1.1,1,1.5h-7s0-1,0-1c.8-.2,5,.2,5,0v-61.5c0-1.6-7.6-1.5-9-1.5v69h15c.2,0-.7-3.6,1-3v97c0,.5,9-.5,9,0v132c0,.5,10,0,10,1v122c0,.4,8-.4,8,0v106c0,.4,7.4-1.2,7.9,1.6v72.4c.1,0,6.1.5,6.1.5-2.2,2.4-14.4.5-15,.9-1.6,1.2-.8,4.7-1,6.6h17c.4,0-.3-6.9,0-8h1s0,42,0,42h25.5c2.9,0-2,9,4.5,8v-80c10.6-2.4,21.3,0,32,0l-6,1v78h7v-79h1v38c0,.5,9-.5,9,0v40.5c0,.3,2.1,1.6,2.5,2.5,1,2.3-.8,5.6,2.5,5v-175c7.7.3,5-.8,5-5.4,0-2.1-.2-12.8.2-13.4s5.9-.7,6.4-4.1l1.5,3c1.8-3.7-.2-7.2,0-10.3,1.1-11.3,5.5-22.9,3.9-34.7l5,35.5c.2,1.4-.2,6.3,0,6.5,1.1,1,10.6-2.3,8,6-1.8.2,0-1.8-2.4-2.1s-20.4,0-21.6,1.1c-3.5,3.3,3.3,1,3.5,1h19c.2,0,1.8,1.7,1.5,2l-9-1v15h10v-17l1.6,9.7-.6,8.3h7s0,102,0,102c0,.3,3.5-.4,5.1.5s-.2,2.5,0,2.5c1.2.6,10.8.8,13,1v50h10v-261.5l10.5-27.5c1.4,3.8-10.7,28.1-9.5,29l26-1v-59l2,12.5c0,37.3-.1,75,0,112,0,64.5,0,129,0,193.5h24c-.7-1.5-1-2.7-1.1-4.4-1.6-64.9,4.6-135.7-.9-199.6.2.4,1.3,2.3,2,2-1.1-8.1-1.2-16.3-1-24.5s.7-18.8,1-28,1.4-6.1,1-6.5-8.6-1.4-9-1c-.7,19.6,4.3,38.6,6,58-3.4-6.8-7.9-44.7-8-53.5s1.1-6,1.1-8.9c0-8.8,0-17.7,0-26.5h-5c-1,16.7,1.4,35,0,51.5s-5.1,21.4-6.3,31.7l-2.7,7.8c2.7-18.7,8.8-36.8,8-56l-8-1c1.1-.3,8,.4,8,0v-33l-2,1-7-26.5c1-1.6,1.3.8,1.5,1.5,2.1,6.7,3.1,13.9,5.4,20.6s-.9,2.9,2.1,2.3v-17h1v16h6s1,31,1,31c.8.8,9-1.9,9,2.5l-1,290c2.5,0,4.4,2.7,8,2.5v-239c2.4-.3,8.2.9,9.6-1-.7-6.1-.4-14.2,3.9-19,.4,3-2,5.4-2.4,8.6s.2,7.7,0,11.4c4-1.9,8.7-.7,13-1v-20h2v18.5c0,.3-1.2.7-1,1.5l12,1c.5-.5-1-12.2-1.5-14s-7.7-17.4-9.1-18.9-.9-1.4-2-1l-4.5,5c-.6-2,4-5.9,4-6.5v-19.5h2v19.5c0,1.5,10.7,18.4,11.9,27.1s-.1,8,.2,8.3c.6.6,8.8.6,9,1.6v234.9c-.2,3.9-11.1.8-13-1.5l12,2v-235l-16-1v229.5c0,.4,2.5,2.2,3,3-1,1.7-2.4-.8-3.8-1.3s-5.2.4-5.2-2.7v-228.5h2v230h3v-231l-28,1v238c3.3,0,6.6.3,9.8-.7s4.7-4.9,7.2-3.8c-4.3,6.6-13.3,6.3-20.5,5.5-4.7-.5-6.7-2.7-13-2s-10,4.3-14.1,4.9-13.4.5-15.9,0-6.9-3.5-5.5-5,4.9,3.7,6.5,4c11.8,2.3,16.6-2.9,26.2-4.7s5.5-.2,8.3-.2v-29l-65,2v32h3v-31l2,.5c-2.3,9.7,0,20.5-1,30.5l6,1h-12c3.2-9.7-.9-24,.9-33.4s2.9.1,3.1-1.1v-48.5c0,0-7.1,0-7.1,0v81c0,0,5.5-.3,1.5,1-6.5-1.5-12.8-2.5-19.5-2l8.5-1,8.5,1v-80h-26v73l-8-1,3-178v177h3v-72c1.3.5,3-1,3.5-1h19.5v-2s-6,0-6,0c-.5-.4,1-1.3,1-1.5v-100.5c-12.4-.4-24.7-2-37,0v177c-3.2-2.6-7.9-1.5-12-2l5-1v-5h-34v6h25c-.2,1.8-4.6,1.5-5.9,1.6-2.9,0-17.6-1.1-18.6.4s.1,3.9-1,4.1c-2.5.4-5.4-1.1-8-1.1s-6.2,1.7-9.5,1.1l7.5-2h9.5s0-3,0-3h-80.5c-3.5,0-3.1,9.9-2.6,12.4s3.4-.5,3.1,1.5l-2.5,2,898,1,.5-2-6-1.5,3,.5v-32h-10v27c3.6-.7,7.4-2.2,8,3-4.9-4.4-11,1.2-17-2-.5-1.6,2-.9,2-1v-62h-11v66l6.5-2c1.4.9-1.4,1.8-1.9,2.1-7.4,2.9-9.2-.6-16.1-1s-7.4,1-12,2c-3,.6-.5-1.3-.5-1.5v-45.5h-7v47c2.1.5,5.7-2.9,5,1h-10s4-1,4-1c.2-22.5.1-45.1-1-67.4-.2-4.2.7-10.4,0-14s-3.4.5-3.1-1.5c1.2.2,3.8-.7,4,.6,1.8,11,.6,23.2,1,34.4h7s0-15.5,0-15.5c22-5.2,10.9,9.6,14.2,13.4s4.6.2,4.9,1.8v45.7c2.8,2.1,3.7,3.4,4-.8,1.2-16.3.3-36.4,0-53.1,0-3.6-.3-8.2-1.1-11.5h14c1.6,6,.9,12,0,18,.9.2,6-.3,6,0v17h11v33l2-.3,10.5,4.3H11s9.7-5.3,9.7-5.3c2.8-8.6,2.3-12.8-7.7-12.2,0-1.3,8.5,0,9-.5,1.3-1.3-1.4-33.2-.5-38.1.6-1.2,16.2-1.6,18.5,0v-23h22v36c0,.4,5.9-1.2,6.9,1.6,1.5,4.6-1,32.1.2,33.3s6.7.9,7.9,1v-115c11.9-1.5,25.1-1.7,37,0v94h10v-35h16.5c.3,0,2.7,1.6,3,2,1.9,3.1.2,26.3-.2,31.5.4,2.1,5,1.4,6.7,1.5v-16c7.7-1.8,16.2-1.2,24,0v22c0,.2,3.7-.7,3,1-2.9-.2-5.4,1.1-8,2,1.7-.7.9-16.4,1-19.5s-.8-3.7,1-3.5v21c.6,0,2-1.3,2-1.5v-20.5h-22v23c3.2-1.2,6.1,2.5,7.7,2.8s7.3-3.3,10.3-1.8c-1.8.6-7,2.9-9.6,3s-4-2.5-6-2.7-5,1.4-7.4.7c-.2-2.1,3.5-.5,4-1s-.2-6.5,0-8h-10s2-1,2-1v-33h-3v43l2.5-1c2.2,2.5-3.3,2.7-5.5,3-.1-1,2-2.1,2-2.5v-42.5h-13v51h3.5s-9,5-9,5c-3,.2-.8-1.2.2-1.8s4.3-1.9,4.3-2.1v-18h-10v24h-6s0-1,0-1h5v-117c-11.7-.4-23.2-1.2-35,0v113.4c1.9,1.7,15,3.4,15,0v-112.5h2v111.5c0,.2-1.3.9-.9,1.4s2.3-.6,1.9,1.1c-3.4-.9-9,3.2-11.4,3.1s-.4-1.7-1.3-2c-2.4-.7-14.8-2.9-17.3-3.1,1-.9,1.9-1,2.1-2.4,1.1-9.4-1-20.9,0-30.6h-6s0,34,0,34c.4.5,3.1-1,4-1-1.6,1.5-1.5,2.5-4.6,2.9s-6.9.9-7.4-.9c.9-.3,7,.3,7,0v-39h-10v40c1.8-.5,3.1.7,1.5,2l-9.5-2.5,7,.5c-1.5-8.4,0-16.9-.1-25.4s-.9-3.3-.9-5.2,1.5-9.2,1.1-9.5c-.6-.4-3.5.7-4-.5,0-.9,4-.6,4-2v-29.5h-9s0,69,0,69c-2.8-.7-1-1.9-1-2.5v-44.5h-17v49c1.6,0,6.3-2.6,7,0-3.6,1.7-9.6.8-12,4h569v-15l-77.4-.9c-2.9.8-.3,5.3-2.6,5.9-.2-1.1.3-4.7,0-5-1-1-24.7,0-28.5,0s-5.2-1.3-8-1.1-4,1.9-6.5,2.1c4.7-8.4,18.3,4.6,16-9h-20.5c-1,0-2.1,2.6-1.5-1h6s0-113,0-113l-22,1c0-.6,1.3-2,1.5-2h20.5v-2h-23v28c1.7-.3,9.6.4,10,0,.6-.6-1.2-5.1,1-5v100c0,.4,4.3-1,4,1-2.2,1.2-5.5-.1-7.2.2s-4.4,3.1-4.7,2.8c-2.9-2.8,7-3.6,7-4v-94h-13v99.5c0,1.1,1.8,1.8-2,3-7,2.2-10.3.2-16.6-.5s-7.2,1.7-11.4-1.1c0-.7,1-1.2,1-1.5v-142.5h-12v56c0,.4,8-.4,8,0v85c0,.2,3.9.6,2.5,2l-6.5-2c-.4-1.9,3-.7,3-1v-83h-42v87h7.5s10.5,2,10.5,2c-6.2,1.5-11.2-2-17.3-.8s-6.7,4.2-6.7,1.3v-90.5h1v90c2.8.4,4.1-.6,4.1-3.4v-85s-3.1-.6-3.1-.6c4.2-6.6,1.1-16.3,2-24h-20v107h-1v-107h-5v104.5c0,.3,1,.6,1,1,0,2.3-3.4.4-4.4.5-2.4.2-9.5,2.2-11,1.6s-2.2-2.9-4.9-2.7-3.2,3.7-3.7,4-2.1-1-3.3-.8c-2.8.3-5.6,1.6-8.6.9l4.5-3c1.3,5,8.3-2.8,11-2.9s2.6,3.4,5.5,2.9v-11s-11.4,0-11.4,0c-2.2.3,1.8,11.9-2.6,11-.9-4.1,1-8.8.9-12.4s-.9-2.7-.9-4.1c0-6.9.7-13.2,1-19.9s.7-4.7-1-4.5c-.1,15.4-5.1,30-8,45l-11,1,8-364-2,3.5-2,80.5-39-6c-.3-1.7,2.4-1.1,3.5-1,4.7.4,33.3,6.2,34.5,5-.2-1.3.4-5.5,0-6-.7-.8-19.1-3.1-21.4-3.1s-15.6,1.8-16.3,2.3-2.6,7.1-4.2,8.3c4.6,2,40.5,8,41.9,6.4s-.9-3.3,1-2.9l-2,84-66-8c5.5-31.2,15.1-63,29.1-91.4,1-1.9,3-7.2,4.9-7.6-.4,1.1-2.3,6.7-2,7,11.8-.3,23.5,1.9,35,4v-7s-33-4-33-4c4.1-11.7,11.8-23.9,17.5-35,1.5.8-.3,2.4-.7,3.3-4.3,10.1-10.3,20.7-15.8,30.2.8.9,5.5.7,5.9.4.8-.7,5.2-16.7,6.6-19.9s4.5-8,6.5-12c-1.3,5.6-3.9,8.7-5.8,13.7s-4.5,12.8-6.2,19.3l25,3,2-64c-5.7,3.9-6.8,12.5-9.8,18.7-1.5,3.2-3.7,6.3-5.2,9.3,1.6-6.9,4.5-11,7.6-17.9.7-1.7.9-3.2-1.1-1.1-14.5,16.8-26.2,35.6-38.5,54,.4-1.3,1-2.6,1-4-4.4.4-8.7-1.9-10.5,3l.5-3c-11.7.2-23.4-.7-35,1,6.8,5.8,17.5,5.6,24.5,12,1.7-1.4,2.7-3.7,2.5-6l-3-1c2.2-.7,8.8,1.8,8-2-3.9,0-7.1,1.3-11,0l1.5,3-13.5-4,35,1c-3.4,11.5-11.1,22.5-13.9,34.4-.2.7-.6.5-1.1.6.2-.7-.1-2.1.2-3.2.8-2.8,7.4-16.6,6.8-17.8-2.3,1.5-7.1-1.7-8.5,0s-7.3,14.8-8.8,18.4.3,4.6-1.9,5.3-2.7-1.3-5.2,1.4-5.1,10.7-5.5,12.5c-.7,2.7,3.8.2,4.5-.5.9-1.1,2.2-6.8,3.1-8.9s1-4,2.5-4c-.4,3.8-2.4,7.3-3.5,11s-1.3,3.3-1.6,4.4c-.5,1.6-3.2,11.2-2.8,11.6,3.4-2,6.7.4,9.5,0s3.1-8.9,5.5-11.6l-10-3.5c14.4,4.3,10.4-4.5,15-14-.8-.5-8.2.7-9-2,3.4-.5,6.7,1.5,10,1-23.2,78.2-34.2,155.1-16.7,236.2s4.4,21.5,6.7,25.1,7.4,3.8,9,2.7c-11.2-31.1-14.4-64.1-16-97l72.9,7.1c2.1,3.9.2,8.3.1,12.3-.2,24.7-1.6,49.3-.9,74.1-.2,1.5-4.1,4.2-6.1,4.5,4.4-4.6,6.2-4.7,5-12h-57c.3,1.8,2.1,9.9,3.5,10s2.8-2.3,5.9-2,5.8,4.1,8.3,4.8,14-.2,16.6-1,2.4-3.6,9.2-2.8l7.5,3c-3.9,1-8-2.5-11.4-2s-3.2,2.7-5.7,3.4-13.4,1.3-15,1.1c-4.4-.5-7.3-5.4-10.3-5.4s-6.6,4.1-10.8,3.7c-8-.8-6.7-10.7-10.2-15.8h-14.5l2,11h16c-1.4,2.7-6.2,1-8.3,1.1s-2.7.9-4.2.9-3.4-1.2-3.5-1c-.5.7,1,3.3-1,3l-3-14.6c-5.9-2-8.2,3.5-13.1,3.6.5-2,4.4-2.2,4.7-4.5s-4.6-15-5.4-18.3c-17.8-77.3-2.8-184.7,39.7-252.2-.8,4-10.9,21.2-10,22s2.9-.3,3.8-1.7c4.6-7.4,7.3-19.7,12.7-27.3,3.8-2.9-1.2,4-.5,5,2.3.4,5,1.7,7.4.9s4.3-7.4,4.6-8.4c.6-1.9-.3-1.3-1.5-1.5s-10-.2-10.4,0-3.2,7.6-4.3,9.3-1.7,1.4-1.8,1.6c.2-1,1.1-2.5.8-3.4-1.3-4.9-22.4-8.4-25.8-13.1,0-3.5,32.5-2.8,37.3-2.6l13.2-20.9c1.7,1-.5,2.2-.9,3.1-3,5.9-7.2,11.7-10.6,17.4h9c14.8-22.8,30-45.9,50-64.5l-1,83.3c2.8,2.9,7.7,2,8.1-2.3,1.2-.3,1.2.5,1,1.5-1.3,5.9-10,2.4-10,4,2.7,1.5,7.4-1.2,9,2.5l-8-1-2,42.4c-.1,78.9-3.5,157.4-5,236.1l8-.6c3.2-16.7,8.1-33.3,9.1-50.4,4.6-75.5-4.4-155.6,1-231-1.1-32.1-2.1-64.9-1.1-97.1,0-1.8.6-3.3,1.1-4.9-1.6-1.8-3.3,1.6-4.5,2.5-3.1.3-.5-1.1-.5-1.5v-67c0-.8,4.3-5.3,5,1l1,168.5,27-2c.2-1.5-1.9-1.2-3-1.5-6.6-1.7-16-4.1-22.5-2.5-1.3-1,1.3-1.9,2-2,2.8-.4,23.7,3,24.5,4,2.1,2.5-5.6,4,0,5.5-7.2,6.2-18.7,8.8-28,7.5v255h12v-19h13v-75h28v24c8.6-.6,17.4.9,26-1v-57c0-.2,2.3.6,3.1-.6,2.6-3.9,5.6-15.8,8.1-20.7.6-1.7,2.7-1.7,3.5-3.2s.2-14.9.3-17-.8-3.7,1-3.5v22c0,.2,1.9-.2,2.8,1.7s4.2,18,4.2,20.3c-3.6-5.1-3-15-5.5-20s-1.3-1.3-1.5-1c-.7,1.6,1,3.7,1,4.5v17c0,.9,5.9,3.8,6-.5,1.7,2.4,4.6,2.9,4.8,3.2s1.8,8.8,2,10.4l.2,108.4c1.6-1.8,9-.5,9-1v-76h14v-29c2.9.1,25-1.3,25,1.5v115.5h3v-102c2-.4,11.4.5,12,0,1.6-1.5.5-17.5,2-20.9l-6.1,11.3-1.8.2c.8-3,10-16.8,10-18v-19.5c1.8-.2.9,2.3,1,3.5.2,4.2.7,10.9.4,14.7s-2.6,8.6-3.1,12.6.7,11.3-1.3,16.2c1.6-.3,8.6.4,9,0s1.7-11.3,2-13h-8c.4-2.7,6.6-.6,7-1l-5-15c1.7.3,1.7,2,2.3,3.2,1.7,4,3.9,9.9,5,14s1.3,11.4,1.7,11.8,3.1-.2,4,0v69s18.5,0,18.5,0c.3,0,1.9,1.7,2.1,2.5,1,4.9-1.8,17.4-.4,21.9s2.2.6,2.3.6h25.5c.6-9.1-.9-18.4-.9-27.4s.9-3.3.9-5.1c0-6.3-.3-12.7,0-19s-.8-3.7,1-3.5v14c4.8.4,9.6-.4,14.3-.4s1.9-1.9,1.7,1.4h-16v6h18c.3-.7-1-1.2-1-1.5v-19.5h-15l6-1v-91.5c0-3.9,9.2-1.7,10-2.5v-107c1.5,0,9.7,0,10-1.6v-127.8c-.1,0,8.9-1.6,8.9-1.6v-148c0-.4,8,.4,8,0v-66c0-.2,4,.2,4,0v-57c1.1-.2,4.7.3,5,0,1.1-1,.2-25.8,0-29.6s-1.2-4.2-1.1-4.4c.3-.3,1.6.2,2,0,1.4,6.3-1.9,50.2,0,52,.1.1,3.8.1,4,0,1.8-1.7-1.4-43.5,0-49.5-.4-2.5-1.6-2.8-4-2.5ZM602,128c-.7.1-4-.2-4,0v56c0,.2,3.7-.7,3,1-.9.3-7-.3-7,0v65h8v-122ZM618,216h-15v93c2.9.4,5.6-.9,8.5-1.1s6.5,1.6,6.5-.4v-91.5ZM602,251h-14.5c-.1,0-1.5,1.4-1.5,1.5v56.5l16-1v-57ZM626.9,311.1c-1-1.2-15-1.5-17.9-2.1v5c2.8-1.1,17,2.1,18,1s.2-3.5-.1-3.9ZM586,315h15v-5c-5.3,1-16.4-3.3-15,5ZM608,310c-.3-.3-4.8.2-6,0v5c1.3-1.2,5.8-.8,6-1s.2-3.8,0-4ZM627,316l-18-1v126l18-1v-124ZM593,399c.4.2,1.8-.6,2,.6v41.4s6,0,6,0v-125h-15v82c3.2-.2,4.4-.3,7,1-3,1.6-15.5-.1-15.8,2.5s.8.8.8,1v39.5l16-1-1-42ZM608,316h-6v125h6v-125ZM303,357.5v64.5l3.1-2.5v-63.5c-1.2-.3-2.8.7-3.1,1.5ZM616,448v-7c-6.2,2.2-8-1.4-7,7h7ZM637,443c-1-.8-17-1.2-20-2v6s20,2,20,2c-1.3-1.5.2-5.8,0-6ZM594,442l-16,1v6c.6.6,15.3-.4,16-1.1s-.2-4.6,0-6ZM601,442h-6s0,6,0,6h6s0-6,0-6ZM608,442c-5.3-.6-6.6.7-6,6h6s0-6,0-6ZM617,449v114h17.5c.4,0,1,2,2.4-.5v-112.5c0,0-19.9-1-19.9-1ZM616,449c-1.4-.2-7-.3-7,1.5v113.5h7v-115ZM594,450h-16v78c0,.4,8-.4,8,0v37h7s1-115,1-115ZM601,450h-6c.6,38.4-.8,76.7-1,115h7v-115ZM608,450h-6v115c1.4.3,6,0,6-1.5v-113.5ZM809.5,780c7.3-.2,14.7,0,22,0s2.2-1.5,3.5-1v-198.5l-12-23c.7-1.4,1.9,1.3,2.2,1.8,3.5,6,5.6,13.2,9.8,18.7v-57s-27,1-27,1v258.5c.2,1.4,1.3-.5,1.5-.5ZM333,529c3-3.9-6.2-2.1-6.6-2.1-3.3-.2-16.3-2-18.3.1s.2,5.5,0,7c1.6,1.6,23.5-3.1,25-5ZM251,530c-.1-.1-3.4-.8-4-.5.7,2.2,3.4,15.9,4.1,16.4,2.7,2.2,4.1-1.9,4.4-1.9,3-.8,1.8,1.8,3.9,2.1l29.6.9c.2-3.7-.7-7.6,1-11l-38-6c-.4,1.4,1.6,5.4,1,6s-2.9.1-3,0c-.7-.6,1.6-5.3,1-6ZM585,565v-36c-.7-.3-1.2,1-1.5,1h-15.5v35h17ZM250,546l-3.5-13c-3,3.7-3.8,8.7-5.5,13h9ZM250.9,547.1c-.4-.4-10.3-.3-10.8,0s-3.6,11-4.1,12.9l20,1c-2-1.7-4.5-13.4-5.1-13.9ZM256.8,547.2c-.7-.5-5.3-1.1-4.7,1.2s4.5,12.1,5.1,12.4c1.1.6,3.4,0,4.8.2,1-1-4.5-13.4-5.2-13.8ZM289,548l-30-1,6.1,13.9,23.9,1.1v-14ZM256.9,562.1c-3,.8-20.1-1.3-20.9-.7s-4.5,13.1-4,13.6l31,1-6.1-13.9ZM262.8,562.2c-.8-.5-5.5-1-4.8,1.3s5.5,11.4,5.9,11.9c1.1,1.4,4.4.3,6.1.6.6-.5-6.5-13.4-7.2-13.8ZM289,563l-23-.5c4,8.7,2.6,13.6,13.5,14.5s8.9-3,9.5-14ZM211,563c-7.8,0-7.2,9.4-10,15,8.5-1.1,6.6-8.7,10-15ZM625,564c-7.4.1-9,.1-8,8,7.4-.1,9-.1,8-8ZM626,564v106h19v-96c-.5-.5-12.6-.7-14.5-1s-3.1-.2-3.5-2l16.5,1.7c2-.4,2.4-6.8-.2-7.6s-13.1-.2-17.4-1.1ZM616,565c-7.4-.9-7.5,1.4-7,8,7.3-1.3,7.7.2,7-8ZM585,566h-17v7h17v-7ZM593,566h-7v7h7v-7ZM601,566c-6.1.5-7.9-.4-7,7h7s0-7,0-7ZM608,566h-6v7h6v-7ZM617,573v98c1.5-1.4,6.8-.7,7-1,.4-.4,1-8.9,1-10.5,1.5-28.7-1.2-58.7,0-87.5-1.6,1.6-7.7.7-8,1ZM616,573c-1,.5-7,.6-7,1v98c1.4-1.5,7-.6,7-1v-98ZM585,574h-17v62c0,.4,8-.4,8,0v34c0,.5,7.4-.3,9,1v-97ZM593,574h-7v97h7v-97ZM601,574h-7v97h7v-97ZM608,574h-6v97h6v-97ZM220,576c-2.5.5-10.4-.8-11.9.1s-3.7,11.9-4.1,13.9c2.5-2.5,11.4,1.4,12.9,0s1.9-11.9,3-13.9ZM270,586c-2.9-3.1-4.1-5.8-6.7-8.8l-31.7-1.2-3.6,13.1,44,2c.4-.4-1.5-3.9-2-5,2.7,2.9,4.5,6.1,9,5l-.5-3c1.8,4.7,5.3,2.7,9.5,3v-13c-5-.4-10.3,1-15-1l.5,4c-2-4-3.5-3.5-7.5-4,.9,3.2,2.6,5.8,4,9ZM761,605v-7.4c-.1,0-4-21.6-4-21.6v15s-2-.5-2-.5c2,3.6.4,5.9,0,9.1s1,3.1.8,3.3c-.3.4-2.3-.7-1.9,1.1l7,1ZM206,578c-2.8-.2-4.8.8-6.2,3.3-2.9,4.9-7.5,23.2-9.3,29.7s-5,19.6-6.4,26.7-2.6,18.2-4.1,27.3c12.5.3,7.5-6,10-15-.9-.8-6.5,2.7-7,0,1.4-1,6.7-.8,7-1,.5-.5,1.4-12,2-14-.5-.5-5.7,2.7-6,0,9.3.4,7.1-8.3,9-15l-6,1.5c1.1-2.2,5.2-1.9,6.1-3.1s3.3-11.9,2.9-12.4l-5,1.5c.9-2.1,5.3-2.1,5.8-2.7s1.6-10.2,3.2-12.3c-1.2-1.8-4.6,2-5,1.5-2-2.4,4.1-2.4,5.5-4s1.7-9.1,3.5-12ZM276,595c-1-1-1.8-1.9-2.7-3l-46.3-2-2,13,56,2c-1.3-3.9-3.7-5.8-5-10,3.4,3.4,7.1,13.1,12,9.9s-.5-11,0-12.9h-7s3,6,3,6c-4-2.8-2.7-7.6-9-6,.5,1,.7,2,1,3ZM216,591h-13s-3,13-3,13c3.2-2,10.5,1.4,12.9-.1s2.9-10.9,3.1-12.9ZM213,605c-13.5-1.5-14.6-.5-16,13,2.5,0,5,0,7.5,0s3.7-.8,3.5,1c-2.7.5-9.1-.9-11.1.5s-2.2,11-2.9,13.6c.5.5,13.3-.7,13.9-1.1,1.1-.9,2.8-23.4,5.1-26.9ZM288,614c.8-.7-5.1-8-6.5-8-19.2,0-38.4-.5-57.5-2-.5,3.1.8,1.6,2.5,1.9,20,3.6,41.3,4.8,61.5,8ZM760,609l-13,1v14h13v-15ZM208,633c-2.9,1.2-12.6.4-14.1,1.4s-1.8,11.1-2.9,13.6l15.1-1.4,1.9-13.6ZM575,638h-17v33c3-1.3,13.2.5,15.4-.1s1.6-1.1,1.6-1.4v-31.5ZM399,641.5c-.9,3.3,0,16.9,0,21.5s3.9.1,4,0c1.2-1.1-1.3-19.7-1-23-1.1-.3-2.8.7-3,1.5ZM398,663v-16l-7,15.5,7,.5ZM206,648c-2.6.8-12.8.5-14.1,1.4s-2.6,12.9-1.9,13.6l15-1,1-14ZM205,663c-.5-.5-14.3.9-15.1,1.4-2,1.3-.5,10.8-.9,13.6l14.9-2,1.1-13ZM396,664l-8,1c1.4,18.3-.3,36.8,1,55,1.7.4.6-1.5,1.1-1.9s4.4,1.6,5.9.9v-55ZM410,664v143c0,.3,4.1.5,5,1v-137.5c0-.3-1-5.1-1.2-5.3-.3-.4-2.9-.4-3.8-1.2ZM188,665c-12.3-.7-7.4,6.6-10,15,11-.1,10.1-5.6,10-15ZM624,671c-7.3,1.3-7.7-.2-7,8,7.2-.2,7.7-.8,7-8ZM633,671c-8.7-.7-6.7,0-8,7h8s0-7,0-7ZM649.5,671c-4.1-.5-10.1,0-14.5,0s-1.8,5.3,0,6.6,14.9.8,18.1,1.5c-.2-4.1,1.6-7.3-3.5-8ZM575,672h-17v7h17v-7ZM585,672h-9v7h9v-7ZM593,672h-7v7h7v-7ZM600.9,673.1c-.2-.3-6.6-1.4-6.9-1.1v7s7,0,7,0c-.3-1.4.5-5.2-.1-5.9ZM608,679l-1-6.6c-6,.1-5.3.9-5,6.6h6ZM616,672c-6.2.3-8,.2-7,7h7s0-7,0-7ZM204,677l-14.9,2.1c-.6,4.3-1.5,8.6-1.1,12.9l16-1v-14ZM187,693c.5-.5-.4-11.9,0-14l-9.1,2.6v12.4c1.5-.4,8.7-.7,9.1-1ZM633,679l-8,1.1c1.2,13.8-.2,27.6-.1,41.4s1.1,5.4,1.2,8c0,4.8-1.9,9.6-.6,14.5.5.6,7.5.4,7.5,0v-65ZM653,680h-16.5c-.2,0-2-2-2.5-.5v64.5h19v-64ZM575,680h-17v50c12.9-2.2,8.3,6,9,15h8v-65ZM585,680h-9v65h9v-65ZM593,681l-7-1v65h7v-64ZM608,680c-1,.7-6,.7-6,1v64h6v-65ZM616,680h-7v65h7v-65ZM624,680h-7v65h7v-65ZM601,681h-7v64h7v-64ZM204,692c-2.6.8-14.9,1-15.9,2.1s.3,10.6-.1,12.9c3.1-1.3,13.4-.3,15.1-1.4s.5-10.7.9-13.6ZM480,693c-4.9.8-12.8-2.8-11,4,4.9-.8,12.8,2.8,11-4ZM487,693h-6v101h6v-101ZM498,693h-10v101h10v-101ZM178,695c-1,1,.8,24.4,0,28,1.7-1.2,8.7-.7,9-1,.5-.5-.4-11,0-13l-7.5,1-.5-2c1.4,0,7.4-.5,7.9-1.1.8-.9-.3-10.6.1-12.9-1.4.8-8.7.7-9,1ZM480,698h-11v96h11v-96ZM204,707l-16,1,.5,13.1c.8,1.3,1.6.6,2.5.5,1.8,0,12.4-1.1,12.9-1.7.8-.9-.3-10.6.1-12.9ZM437,707h-10v102c1.4.5,10-.5,10-1v-101ZM285,720l-68.4-6.9c-2.3.5-1.5,5.1-1.6,6.9,4.1-1.5,7.2.8,10.5,1,18.8,1.1,39-.1,58,1l1.5-2ZM717,715h-24l1.5,78h22.5v-78ZM205,735l-1-14-16,2c1.9,4,.7,8.7,1,13l16-1ZM285,737v-14l-60-1,2,2.5c-1.9,2-4.1-3-5.5-3.5-.4,3.7-3.1-.4-6.5,0l1,14,15,1c-.9-2.8-6.6-4.7-5.5-8,4.4,2.9,5.6,9.6,11.5,8l-9-9.5c3.7-.9,7.3,6.8,10.4,8.6s33.7.7,41.1.9,3.6.8,5.4,1.1ZM187,723l-9,1c1.5,3.5,2,27,3,28s7.4-.3,9,0c-2.4-6.8,1.9-17.9-9-13-1-4,6.1-1.1,7-2s-.8-11.7-1-14ZM191,751h16l-2.5-15-15,2,1.6,13ZM236,741c-5.1-6.1-12.8-3.4-20-5l1,14c8.7.1,17.4-.6,26,1l-2.5-5c3.4,4.1,5.8,5.9,11.5,5-2.2-3.9-13.1-17.4-18-14l2,4ZM285,738l-43-1c2.7,2.1,10.6,13.2,12.7,13.8,7.2,2.1,21.1-1.5,29.3,1.2l1-14ZM61,743h-10v30c0,.5,8.6.3,10,1v-31ZM633,745l-8,1v6s8,0,8,0v-7ZM643,752c1.1-8.2-2.3-7.3-9-7-1.1,8.2,2.3,7.3,9,7ZM575,746h-8v6h8v-6ZM585,746h-9v6h9v-6ZM593,746h-7v6h7v-6ZM601,746h-7v6h7v-6ZM608,746h-6v6h6v-6ZM616,746h-7v6h7v-6ZM624,746h-7v6h7v-6ZM219,765h37l-.5-3c.6,2.8,8.5,4.9,9.5,4s-1.9-2.5-.5-3c.8.5,2.7,3,3,3h16.5v-13s-28-1-28-1l.5,3c-2.4-3.6-5.6-3.2-9.5-3,.6,2.4,5.9,4.1,4.5,7l-7.2-6.8-27.3-.7,2,13.5ZM207,752h-14.5c-2.5,0,.8,10.6.5,13h16l-2-13ZM189.9,753.1c-.8-.7-7.1.3-8.9-.1,1.2,2,1.6,12.5,2,13s6.5-.3,8,0l-7,1c.4,2.1,2.3,13.3,3.1,14s6.7-1.5,7.9-1c-2.5-3.5-3.8-25.8-5.1-26.9ZM565,753h-17v33h18c.3-.7-1-1.2-1-1.5v-31.5ZM575,753c-2.9,1.7-5.1.7-8,0v41c2.9-.7,5.1-1.7,8,0v-41ZM585,753h-9v39.5c0,2.2,7.1.4,9,1.5v-41ZM593,753h-7v41c0,.3,5.1-.2,6,0l-1,7h2s0-48,0-48ZM601,753c-2.5.4-4.6,1.3-7,0v48h7v-48ZM608,801v-46.5c0-1.7-4.8-1.1-6-1.5v48h6ZM616,753h-7v48h7c-.6-2.3-1.3-3.8,0-6l-6-.5,6-.5v-41ZM624,753h-7v41h7v-41ZM633,753h-8c1.9,9.8-.1,19.6,0,29.5s-.3,10.1,0,10.5,6.7.4,8,1v-41ZM643,753h-9v41c2.9-1.2,6-.8,9,0v-41ZM661,753h-17v41h43s0-7,0-7c-.4-.5-1.3,1-1.5,1h-38.5v-2h14v-33ZM734,753h-8v40h8v-40ZM1461,754v58.5c0,2.6,6.9-1,9,.5v-47c0-.2,2.8.6,3.1-.5.7-2.6-.7-8.3,0-11.5h-12ZM510,762h-11v32h11v-32ZM518,792v-28.5c0-1.5-4.6-1.8-6-1.5.6,3.7-1.6,30.7,0,31.5l54.1.5c-.6-2.3-1.3-3.8,0-6h-47l1,4h-2ZM209,766h-15l2,14h16l-3-14ZM271.5,781h-44.5l.9-1.7,42,.2c-3.5-2.2-8.2-11.2-11.7-12.3s-17.9,0-23.8-.2-10.2-1.9-15.5-1c2.2,4,4.7,26.9,7.6,27.9l55.7,1c1-.4,1.9-1.2,1.7-2.3s-11.6-11.3-12.5-11.5ZM284,767l-23,.5c3.6,2.3,7.6,10.5,11,12s8.3-.4,11.4.5l.5-13ZM1478,768l-7-1c-.5.4,1,1.3,1,1.5v43c0,.2-1.5,1.2-1,1.5l7,1v-46ZM1501,767h-5v45h5v-45ZM333,802v-28.5c0-1.8-10.4-1-12-1.5v31l12-1ZM198,794c-1.2-2-2.5-12.5-3-13s-6,2.1-8,1c3.3,6.7.6,14,11,12ZM212,781h-16l3,13h16l-3-13ZM284,790c-.7-4.2-5.3-9.7-10-9l10,9ZM426,784h-9v24c0,.5,7.8.5,9,1v-25ZM284,796c-6,1.2-57.2-3.3-58-.5s2.1,1.4,3.5,1.5c16.9.8,34-.5,51,0l3.5-1ZM507,795h-26v6h26v-6ZM590,795h-82v6h82v-6ZM699,795h-78v6h78v-6ZM588,802v16h26c1.7-5.2.8-10.7,1-16h-27Z"
            />
            <path
              class="st0"
              d="M1183,648c1.3,0,5.8-.2,6,0,1.2,1.1-.4,28.3,0,33,3.5-.4,8.2.7,11.5,0s2.4-3.3,4.1-3.9,9.9.4,10.4-.1c-1.5-30.2,2.6-59.7,7-89.3s1.9-.5,3-.7c-2.5,3.4-3,7.7-3.7,11.8-4.6,25.2-4.8,52-5.4,77.6l4,2.1c-2.9,3.4-.9-.5-3.4-.5-1.4,1.7-6.6-1.4-6.6,1.5s14.1,2.7,16,2.5v-155.5c0-1.5,8.6-23.9,10-28,2.6-7.6,9.5-21.6,10.8-28.2,1.3-7,.6-17.9.9-25.5s-1.1-2.2,1.3-2.8v27l2-11,.5,12.1,19.5,54.5c-1.8,2.1-1.5.2-2.1-.9-7.2-14.5-9.5-32.5-15.9-47.6-1.9-.2-.8,2.1-.7,3.2,1.4,14.9,3,29.8,3.8,44.7l16.9,2.1v88c1.6-.2,2.9-.8,4.5-.9s5.1-.4,4.5,1.4c-.4,1.2-7.3.2-9,.5v197.5c-.8,1.3-2.8-1.4-3-1.5.7,0,2.1.4,2-.6v-280.9c-.8-4.2-12.4-2.7-16-4.5v282c5.1.8,9.7,1.3,14,4-2.9-.1-16.3-2.2-18.5-3s-3.9-1.7-2.5-3,4.2,3,6,2v-282l-26.9,1.1c-.8,1.7-1,3.5-1.2,5.3-3.5,49.6,1,105.9,1.1,156,0,39-1.5,77.5-1,116.6,5.7-2.3,10.3-3.6,16.5-3s5.3.4,4.5,4c-1.7,0-.5-1.9-2.9-2.6s-5.1-.6-7.5-.3c-5.7.7-14,4.5-19.7,5.3s-4.8-.7-7.9,0-6.1,4.3-9.5,5.6c-2.9.2-.9-1.1.2-1.8,2.8-1.9,6.1-4.3,9.3-5.2v-124l-27,1v130c3.8,1.4,10.6-1.5,13,2-5.8-1.5-14.5,1.2-19.5.7s-3-1.6-4.9-1.7c-5.8-.2-13.7.9-19.1,0s-2.1-1.8-2.5-2c5.5,1.1,6.2,0,10.5,0s5.6,1.7,8.5,1v-141c-.7-.3-1.2,1-1.5,1h-20.5v137.4c1.1.5,1.9,1,3,1.6-1.2-.2-2.7.2-4,0v-139c-1.7-.2-.9,2.3-1,3.5-1.8,44.4,1.4,90,0,134.5-2.1-.7-3.5-2.8-5-4,1,.3,2,.5,3,1v-96.5c0,0-3-1-3-1l3.1-1v-122.9s-18.1-3.6-18.1-3.6v45s3,.5,3,.5l-3.1,1v172.5c7.7-.9,10,.7,15.1,5-6.2-1.9-7.6-2.8-14.5-3.9s-1.3-1.8-2.1-2c-2.4-.6-5.7.3-8.3,0,.5-2.2,9-.4,9-1v-217l-28,2v213c0,.1,1.5,0,2,0-.5,2.4-3.3,1.7-5.2,2.3s-1.8,1.5-2.3,1.7-.9-3.2-3.5-2l2.1-2.4v-179s-10.1-1.6-10.1-1.6v178.5c0,1.3,5.5,3,7,2.5l-.5,2c-7.2-2.3-8.1-2-8.5-9.4l.6-173.1c-1.4-2.8-6-.5-9.1-.4-6.4,0-12.2-1.2-18.6-1,.8,2.6-.5,12.6.6,14,4.1,5.2,22.1,8.8,23.4,16.5-.3,48.7.6,97.3,0,146,0,3.3,2.5,6.8-2.4,6.5-1.4-.2.5-1.3.5-1.5v-153.5h-9v159.5c0,1.1,1.3,3.6-1,3.5v-163h-29v31h-2v-32c0-.2,2.7-.4,2.5-2,1,0-.4,1.8,1.9,2.1,11,1.4,22.6-3.2,33.6,0l-18-11.4-3,.4c-.5-.4,1-1.3,1-1.5v-15.5l41,1v182.5c0,1.7,5,.8,5,.5v-228c1.8-.2.9,2.3,1,3.5.1,3.2,0,6.4,0,9.5l17-1,10-61c.8,19.9,8,38.9,11,58.5h-1.2c0,.1-8.9-39.5-8.9-39.5-.4,13.7.3,27.3,1,41l20,3v87c2.2,0,.3-4.1,1.1-4.9s2.6.2,2.9,0c.4-.4-.9-5.2-.9-6.5,0-2.8,0-10.5.4-12.6s2.3-1.8,2.8-3,.5-5.5.7-5.7c.4-.4,7.5-.3,8.9-1.1-4.4,5-9.7-2.3-8,8,9.7-1.2,19.3-1.2,29,0-.2-1.2.3-5.7,0-6-.7-.7-13.5-.5-14-1s.5-4.4-1-5.5l2-.5c.2,1.1-.3,4.7,0,5,.5.5,12.9,0,14,1s-.2,7.3,0,9c-.5,0-2.6-2-3-.5l.5,166.5.5-127.5c.8-7.8,6.8-4.3,7.1-6.1.4-2.6,1.1-30.3,0-31.4s-4.8,1.3-5-1ZM1240,501c1.9-4.7,5.3-9.1,8.2-13.3.8-1.3,3-2.9,3.3-3.6.7-1.9-1.2-11.3-1.5-14.1-4.1,3-5.9,9.9-7.7,14.8-5.1,13.1-8.8,26.9-13.3,40.2l26-1-3-38c-2.4-.5-1.6.4-2.2,1.3-3.1,4.5-5.3,10.3-9.8,13.7ZM1124,582c-1.8-12.4-.8-25-1-37.5l-1-10.4-8,49c3.1-1.6,6.6-.9,10-1ZM1179,647h-29v23h-1c.2-3.7-2.9-2.8-2,1h22.5l1.4,141.4,8.1,1.6v-167ZM1216,682h-5s.5,120.6.5,120.6c0,2.4,2.3,3.5,4.5,3.4v-124ZM1225.9,684.1l-8.9-1.1,1,123,8-2.6-.2-119.3Z"
            />
            <path
              class="st0"
              d="M1291,645l-1-95c1.7-.2.9,2.3,1,3.5.3,7.7-.2,15.4,0,23.1s1,8,1.1,11.9c.3,18.5-.3,37.1,0,55.6h5v-25h1v25c0,.5,9-.5,9,0v169h12v-193h-20v-1s6,0,6,0v-17.5c0-.6-2.5-3.5,0-3.5,1.9,6.9,2.3,13.9,2,21h13s0,80,0,80h10c.3-1.8-.5-9.4,0-10,1.9-1.9,24.7-.7,28.9-1v-15.5c0-1.4-.5-4.4,2-3.5,0,2.9-2,19-1,20s7.6.2,9,1c-2.5-6.5-6-14.2-7.6-20.9-.2-1-1.3-3.3.5-3,1.3,3.1,7.1,24.1,8.2,24.9s2.4-.2,3,.2.9,1.4,1.2,1.6c1.3.6,2.9.3,3.7.8,2.4,1.6.2,31.5.9,37.1.3,2.1,1,0,1,5.9.3,24.1-.2,48.3.2,72.5l6.9,1.1c-1.8-7.3-.3-16.1-.4-23.7,0-12.4-1.7-25.4-.7-37.9.1-1.8-.2-3.9,2.1-4.4v65.5c0,1.9,5,1.9,5,0v-73.5c0-.6-5.9-1.4-7,1,.7-4.3-1.5-2.9-5-3-.2-1.7,2.4-1.1,3.5-1,5.8.4,11.6,2.8,17.4,3.1,1.9,3.3.3,24,1.2,24.9s8.3-.3,10,0v-38.5c0-2.7,9.7-.5,12-1.5v-24c3.3.6,18.1,1.2,18.9,3.6,2.2,6.5-1.7,23.6.1,30.7.3,1.1,3.9,1.4,3.1,4.1v81.1c0,0-1.6-.5-1.6-.5l.6-81.5c-.2-1.2-2.9.1-3.1-1.1-1.5-7.8,2.1-25.2,0-31.8-1-2.9-13.7-1.7-16.9-3.6v24c0,.2-4-.2-4,0v88c0,.3,4.7-.3,6.3.2s2.5,3.4,4.7,2.8v-91c9.6-1.8,9.2,4.4,9,12-1.3.3-1.6-1.9-1.7-2.7-.9-5.8,1.9-8.5-6.3-8.3v89c0,.1,2.5-.7,2,1-5.4,4.2-6.3-1.7-7.7-2s-12.6,0-14.7,0c-7.6.2-15.2.9-23.1,1s-9-2.2-13.5-2l.4-115h-4.4c.7,1.5,1,2.8,1.1,4.5.9,36-.7,72.1-.1,108.1l2.1,2.4c-3.7,1.1-7.5.7-11.3,1.2s-3.4,1.6-5.3,1.7c-3.5.3-8.1-1.9-11.9,0-1.4-.2.5-1.3.5-1.5v-96.5h-6v100c-3.2.5-6.3-.9-9.5-1-11.2-.4-29.5-1.4-40.1-.5-.9,0-2.1,2-2.4,1.6v-3s15,0,15,0v-167h-14ZM1359,689l-28,1v9c8.3,0,16.7-.5,24.9.9,1.5-3-.2-5.8,0-8.9l2,4,1-6ZM1362,690c-2.5-2.5-3.8,9.2-5,10l6,1c.5-.6-.4-10.4-1-11ZM1373,809l-.3-115.5c-.4-2-6.9-2.2-8.7-3.4l1,120c.5.5,7.6-.5,8-1ZM1352,811v-109.5c0-2-11.4.3-14-.5v113h3v-100h-2c1.2-2.5,7,1.1,10,0v97h3ZM1337,701h-17v12c.4.5,1.3-1,1.5-1h15.5v-11ZM1353,701v110c2.3-.4,10.2,1.2,10.9-1.6s-.9-4.1-.9-5.9c-.6-33.7.9-67.9-.1-101.4l-9.8-1.2ZM1320,714v99h17v-100s-17,1-17,1ZM1421,723h-7v38c0,.3,5.1-.2,6,0v1c-.8.2-5-.2-5,0v48h6v-87ZM1394,736v74c1.9-.1,7.3.8,7.7-1.5l-.8-71.5-7-1ZM1414,762h-11v47.5c0,2.6,11,1.1,11,.5v-48Z"
            />
            <path
              class="st0"
              d="M287,709c-13.2-1.7-26.6-2.3-40-2l37.5,4c.9-.3,4.4,2.1,1.1,2-24.1-3.6-48.3-5.2-72.5-8-.5-30.9,3.5-61.5,7.9-92l67.6,9-1.6,87ZM223,621c-.5-.3-1.9-1.2-2-1l-1,11h7c-1-3.8-2.8-6-4-10,3.1,2,5.2,9.5,8,10.5,4.3,1.5,4.3-1.6,4.5-1.5,9.9,3.8,22.2,1.7,33,2s12.3,2,18.5,1v-11s-64.5-8-64.5-8c-.6,2,0,5,.5,7ZM287,648v-14l-55-1c2.1,11.9-2.2,1-4-.4s-8.1-1.3-8.9,1.1-.2,9.9-1.1,13.4c5.3-2.3,13.4,1.5,18.4,0,1.2-.3-.5-4.7,3-3.1s.8,4.6,6.9,3-1.3-3.2,5.1,0l35.6.9ZM257,658c-2.1-2-7.3-9-8-9.4s-7-1.2-6.5,1.4c-4.1-4-1.6-1.1-2,2-1-.6-2.4-4-3-4h-20.5c0,4.4.4,8.8-1,13,9.3-1.1,19.5,2.2,28.6,1.1,2.1-.2,1.1-2.4,1.9-2.1,4.9,2.2,2.4,3.3,3.4,5.5s7.5,14,11.1,11.4c-1.1-1.2-1.4-2.6-2-4,1.1,1.1,3,3.6,3.2,3.8,1.4.8,4.5-.5,5.8,1.7-2.3,1.6-4.5-2.6-4,1.5-1.6-1.1-2.9-2.4-5-2-.3.3,1.6,4.1,2,5-1.7-1.5-3.8-4.7-5.5-5l-40.5-1v13s52,2,52,2c-2-3.3-4.2-5.4-6-9,5.8,5.3,14.5,13.6,19.7,19.3s2.2,4.4,2.5,4.6,2.8-.8,2.9-.9c.5-.5-2.4-10.3-1-13h-6c-.6.5,4,7.4,4.5,9s1.3,3.2-.5,3c-.9-2.8-3.5-9.3-5.5-11s-3.5.2-5-.9-8.2-11.3-8.5-13.1c3.8,2.7,6.7,10.1,9,11.5s10.6-.1,13,.5c-2.2-4.3-.6-8.6,0-13h-15l-.4,1.9c-2.4-2.3-8.2-15.8-9.8-16.7s-4.9,0-6.8-.2c1.7,3,3.5,5.8,5,9-2-2-8.2-9.1-9-11.5s-.3-1.6.5-1.5c2.2,3.2,4.8,3.4,8.5,3,.3-.3-1.6-4.1-2-5,1.5,1.5,4,4.7,5.5,5h23.5v-14h-33.5c-.4,0-1.7-2.6-1.5.5,2.7,2.5,4.4,5.2,6,8.5ZM246.8,663.2l-30.8-1.2-1,14,40,1-8.2-13.8ZM286,664h-24c1.7,1.7,7.7,14,8.5,14h15.5v-14ZM281,707l-12.7-13.8c-17.7-2.1-35.6-.6-53.3-2.2l-1,13,67,3Z"
            />
            <path
              class="st0"
              d="M998,465c1.8-.2,1,2.3,1,3.5.3,8.3,0,16.3,1,24.5,4.2-.3,7.7-1.1,11.9,0,2.3,18.9,8.7,38.3,17,55.5v251.4c.4.4,6.3-2.9,7.1,1-3.8-1.6-8,2.1-10.4,2s-3.9-2.7-5.6-3.3c-4.2-1.7-9.1-3.2-12.9,0l-9.1,9.4,6.5-8,.6-131.4-18-2.6v145l9-2c.2,1.5-1.8,1.4-2.8,1.7-5.7,1.7-9.6,1-15.2-.7h8s0-144,0-144l-29,1v138.5c0,1.9,7.6,1.6,9,3-2.8,1-9.4.2-10-3v-138.9c.5-2.1,19.5-1.7,23-2.6v-120c2.9-.6,2.1,1.4,2.1,3.5,0,4.3-1,9.5-1.1,13.9-.7,34.5.6,69.1,0,103.5l2.5-4c-.2,4.8,6.4,2.8,10.5,4v-107.5s2-12.5,2-12.5v121h3v-121h1v121c0,.4,7,.2,7,1v131l3.3-2.2c-.8-3.4.6-6.4.7-9.3s-1-3.6-1-5.1c.9-73-.6-147.2-.1-220.9,0-5.3,1.6-11,1-16.4,2.5,1,0,7.7,1.1,8.9s5.8.5,6.9,1.6c0,1.3-5.9.3-7-.5v241c2.8,1,6.6,1.2,9.2,2.3s6.8,6.9,7.8,1.2v-240.9c0,0-3-1-3-1,4.7,1.3,3.4-10.2,2.1-11.1s-15.2-1.6-18.1-2.4c-.3-1.3,1.7-1.6,2.5-1.5,2.5.1,13.4,3.4,14.5,2.5-6.7-13.6-11.2-29-14-44-1.7.4-2.2,4.4-2.5,5.9-1.7,8.1-2.1,17.1-3.6,25.4s-.2,5.4-1.8,5.7c1.3-14.8,3.8-29.5,7-44h-14.5c-.2,0-1.1,1.5-1.5,1-1.3-3,3-1.7,3-2v-28Z"
            />
            <path
              class="st0"
              d="M947,629v173.5c0,1.3,3.7,1.8,5,1.5v-69c0-.2-3.3.2-4,0-3.1-2.8,5-1.3,5-1v69.5c0,.1,1.9,2.3-.5,2.5s-5.8-2.3-7-2.5c-1.9-.2-8.2,1.3-9.5.5l1-175h-20c-.2-1.8,2.3-.9,3.5-1,8.9-.4,17.7,0,26.5,1ZM946,630l-8-1v174s8.1-1.6,8.1-1.6v-171.4Z"
            />
            <path
              class="st0"
              d="M1054,672v136c0,.4,4.3-1,4,1-4.8,2.7-12-.2-7-5l2,4v-132.5c-1-5.3-11.1-.8-15-2.5v128c0,.3,2.9-.6,3,.5l-4,1.5v-128c0-.2-3,.5-3-.5,3.6,0,2.8-2.5,3-2.5h17Z"
            />
            <path
              class="st0"
              d="M1285,813c.4.4,3.5-.7,4,.5,0,1.1-2.5,0-3.8.7s.1,3-1.2,1.2c-.4-54.3.5-108.7,0-163-.1-18.4-3.5-44.4-1.1-62,.3-2.3,2.6-6,3.9-8.1.3-.5,1.5-3.2,2.2-1.8.1,2-4,7-4,8v224.5Z"
            />
            <path
              class="st0"
              d="M983,545l2-1.7,5-27.3c1.9-.2,1,3.3.9,4.4-.5,4.9-5.2,18.9-4.6,22.2s4.2,1.5,5.7,1.5c1-4.6-1.9-49.3.5-50s1.4,2.1,1.5,3.5c.6,15.5-.3,31.2-1,46.5,2.3-.4,7.4.8,9.1-.4s-.2-4.6,1.9-4.6l4,4c.3.3-1.3,2-1.5,2h-23.5Z"
            />
            <path
              class="st0"
              d="M252,481c2.6-5.9,7.1-11.4,11-16.5s13.2-16.3,13.9-15.5l-25,32Z"
            />
            <path
              class="st0"
              d="M835,455.5c0,.4-1.7,1.6-2.2,2.8-2.1,5.4-4.3,11-6.6,16.4-.7,1.5-1.7,4.8-3.2,5.3,1.2-5.3,3.8-10.6,5.8-15.7s5.2-9.3,5.2-9.8v-46.5h1v47.5Z"
            />
            <path
              class="st0"
              d="M300,426l-22,22c-.4-1.9,1-2.4,2-3.5,4-4.8,11.7-12.5,16.5-16.5,1.1-.9,1.6-2.4,3.5-2Z"
            />
            <path
              class="st0"
              d="M1168,630c1,2.7-1.8,1.6-2,2.6-.4,1.9.3,4.3,0,6.4h-4s1-7,1-7l2,6c.6-3.4-2.1-9.3,3-8Z"
            />
            <path
              class="st0"
              d="M670,811c-.5,1.4-5.2,1.5-6.7,1.6-2.7.2-6.2-.6-9.3.4.1-1.1,5.1-2.6,5.6-2.7,2.7-.2,7.1,1.5,10.4.7Z"
            />
            <path
              class="st0"
              d="M551,810c.1.1.3,2.2-.5,2-2.4-.5-4.5-3.1-6.3-3.7s-6.5.4-7.3-2.2c2.5.6,5.9.5,8.2,1.3s5.6,2.5,5.8,2.7Z"
            />
            <path
              class="st0"
              d="M1429,702h13c0,1.8.5,2.1-1.5,2-3.3-.2-6.9-1.8-10.5-1v18c0,.2,3.8-.5,1.5,2-2,.2-6.4.3-4.5-2s2,.1,2,0v-19Z"
            />
          </svg>
        </div>

        {/* Connecting line SVG */}
        {/* <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1536 1024"
          style={{ opacity: 1, zIndex: 5 }}
        >
          <path
            ref={connectingLineRef}
            d="M 480 280 Q 650 200, 768 350 Q 600 980, 1160 955"
            style={{
              fill: "none",
              stroke: "black",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              opacity: 0,
            }}
          />
        </svg> */}
        <svg
          width="121"
          height="132"
          viewBox="0 0 181 172"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={connectingLineRef}
            d="M0.00271797 1.1297C73.6027 0.729699 158.003 -5.37028 164.503 30.6297V44.6297L159.003 56.1297L150.503 63.6297L137.003 68.6297L73.5027 73.6297L55.0027 78.6297L41.5027 86.6297L30.5027 98.6297L26.5027 106.63V114.13L28.5027 123.13L33.0027 129.13L48.0027 141.13L82.0027 155.63L120.003 164.63L158.003 169.63L173.503 171.13H180.503"
            stroke="white"
          />
        </svg>
        {/* Logo element */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: 0,
            zIndex: 20,
          }}
        >
          <img
            src="https://yigogroup.ae/images/logo.svg"
            alt="YIGO Logo"
            className="w-64 h-auto"
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
