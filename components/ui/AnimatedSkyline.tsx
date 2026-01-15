"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AnimatedSkyline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const pathname = usePathname();
  const isHomePage =
    pathname === "/" || pathname === "/zh" || pathname === "/en";

  useEffect(() => {
    // Load SVG content
    fetch("/images/skylines.svg")
      .then((response) => response.text())
      .then((data) => {
        // Extract inner content by removing the outer <svg> tag
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "image/svg+xml");
        const svgElement = doc.querySelector("svg");
        if (svgElement) {
          setSvgContent(svgElement.innerHTML);
        }
      })
      .catch((error) => console.error("Error loading SVG:", error));
  }, []);

  // Reset logo position when navigating away from home page
  useEffect(() => {
    const logo = document.getElementById("logo");
    if (logo && !isHomePage) {
      // Reset logo to its original position and styles
      gsap.set(logo, {
        clearProps: "all", // Clear all GSAP-set properties
      });
    }
  }, [isHomePage]);

  useEffect(() => {
    if (!svgRef.current || !svgContent) return;

    const svg = svgRef.current;

    // Get all the elements we need to animate
    const line1 = svg.querySelector("#line1");
    const hongkong = svg.querySelector("#hongkong");
    const line2 = svg.querySelector("#connecting_line");
    const dubai = svg.querySelector("#dubai");
    const logo = document.getElementById("logo");
    const videoSection = document.getElementById("video-section");
    const videoTitle = document.getElementById("video-title");
    // const yigoIconSection = document.getElementById("yigo-icon-section");
    // const yigoIcon = document.getElementById("yigo-icon");

    // Hide scroll indicator when user starts scrolling, show when back at top
    const scrollIndicator = document.getElementById("scroll-indicator");

    const handleScroll = () => {
      if (!scrollIndicator) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        // User is at the top - show indicator
        gsap.to(scrollIndicator, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // User has scrolled - hide indicator
        gsap.to(scrollIndicator, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!line1 || !hongkong || !line2 || !dubai) {
      console.warn("Some SVG elements not found");
      return;
    }

    // Get all paths within Hong Kong and Dubai groups
    const hongkongPaths = hongkong.querySelectorAll("path");
    const dubaiPaths = dubai.querySelectorAll("path");

    // Set initial state for all elements
    const allElements = [line1, ...hongkongPaths, line2, ...dubaiPaths];
    // const allElements = [line1, ...hongkongPaths, line2];

    allElements.forEach((element) => {
      if (element instanceof SVGPathElement) {
        const length = element.getTotalLength();
        element.style.strokeDasharray = `${length}`;
        element.style.strokeDashoffset = `${length}`;
        element.style.fill = "none";
        element.style.stroke = "black";
        element.style.strokeWidth = "2";
        element.style.strokeLinecap = "round";
        element.style.strokeLinejoin = "round";
        element.style.opacity = "0"; // Hide the element completely initially
      }
    });

    // Show SVG and animate line1 immediately on mount (before scroll trigger)
    if (line1 instanceof SVGPathElement) {
      // First show the SVG
      gsap.to(svg, {
        opacity: 1,
        duration: 0.1,
        ease: "none",
      });

      gsap.to(svg, {
        attr: { viewBox: "350 100 1200 900" }, // Pan to line1 area
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(line1, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        delay: 0.5, // Small delay to let the component settle
      });
    }

    // Set initial state for logo (hidden and scaled down) - only on home page
    if (logo && isHomePage) {
      gsap.set(logo, {
        opacity: 0,
        scale: 0.5,
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      });
    }

    // Set initial state for video section (hidden with clip-path)
    if (videoSection) {
      gsap.set(videoSection, {
        opacity: 1,
        clipPath: "polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)", // Start as a point at bottom center
      });
    }

    // Set initial state for YIGO icon section
    // if (yigoIconSection && yigoIcon) {
    //   console.log("YIGO icon section found");
    //   gsap.set(yigoIcon, {
    //     // scale: 0,
    //     // opacity: 0,
    //     clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)", // Start as a line at center
    //   });
    // }

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top top",
        end: "+=3500",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          // Ensure pinned element has top: 0 when position: fixed is applied
          if (self.isActive) {
            gsap.set(svg, { top: 0 });
          }
        },
      },
    });

    // Animation sequence with viewBox changes
    tl

      // Phase 1: Pan to line1 area (0-25% of scroll) - line1 already animated
      // Phase 2: Pan to Hong Kong and draw skyline (25-50% of scroll)
      .to(svg, {
        attr: { viewBox: "800 100 800 800" }, // Pan to Hong Kong area
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        hongkongPaths,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.2,
          ease: "none",
          stagger: 0.005,
        },
        "-=0.5"
      )
      // Phase 3: Zoom out to show full view (50-60% of scroll)
      .to(svg, {
        attr: { viewBox: "0 0 4571 1502" }, // Show full view
        duration: 1,
        ease: "power2.inOut",
      })
      // Phase 4: Draw second line and pan to Dubai (60-80% of scroll)
      .to(line2, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1,
        ease: "none",
      })
      .to(
        svg,
        {
          attr: { viewBox: "2400 10 1800 1300" }, // Pan to Dubai area
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      // Phase 5: Draw Dubai skyline (80-100% of scroll)
      .to(
        dubaiPaths,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2,
          ease: "none",
          stagger: 0.02,
        },
        "-=0.1"
      )
      .to(
        svg,
        {
          attr: { viewBox: "0 -350 4500 1300" }, // Pan right
          duration: 2,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    // .to(
    //   svg,
    //   {
    //     attr: { viewBox: "5500 10 1800 1300" }, // Pan right
    //     duration: 2,
    //     ease: "power2.inOut",
    //   },
    //   "-=0.2"
    // );

    // Only animate logo on home page
    if (isHomePage && logo) {
      tl.to(
        logo,
        {
          opacity: 1,
          scale: 3,
          duration: 1,
          ease: "power2.out",
        },
        "-=1.1"
      ).to(
        logo,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          top: `${(25 / window.innerHeight) * 100}%`,
          transform: "translate(-50%, 0%)",
          yPercent: 0,
          ease: "power2.out",
        },
        "+=1.5"
      );
    }

    // Create separate video timeline that triggers after main timeline completes
    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: videoSection,
        start: "top top", // Start when the main timeline section ends
        // end: "+=1000", // Duration for video animation
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        // pinSpacing: true,
        invalidateOnRefresh: true,
        // onToggle: (self) => {
        //   if (self.isActive) {
        //     gsap.set(svg, { top: 0 });
        //   }
        // },
      },
    });

    // Video reveal animation - grows from bottom center
    videoTimeline

      // .add(() => {
      //   // Emit a custom event to indicate the skyline scroll animation finished
      //   try {
      //     window.dispatchEvent(new CustomEvent("skyline:completed"));
      //   } catch {}
      // })
      .to(videoSection, {
        opacity: 1, // Ensure video section is visible
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full rectangle reveal
        duration: 1,
        ease: "power2.out",
      })
      .from(
        videoTitle,
        {
          opacity: 0,
          duration: 1,
          y: 30,
          ease: "power2.out",
        },
        "-=3.5"
      );

    // Create YIGO icon animation timeline
    // if (yigoIconSection && yigoIcon) {
    //   const yigoIconTimeline = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: yigoIconSection,
    //       start: "top top",
    //       end: "bottom center",
    //       scrub: 1,
    //       pin: true,
    //       anticipatePin: 1,
    //       pinSpacing: true,
    //       invalidateOnRefresh: true,
    //     },
    //   });

    //   // YIGO icon animation - two-part reveal: top half left-to-right, bottom half right-to-left
    //   yigoIconTimeline
    //     .to(yigoIcon, {
    //       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full reveal
    //       duration: 0.8,
    //       ease: "power2.out",
    //     })
    //     // Phase 3: Icon appears and grows
    //     .to(
    //       yigoIcon,
    //       {
    //         scale: 1,
    //         opacity: 1,
    //         duration: 1,
    //         ease: "power2.out",
    //       },
    //       "-=0.4"
    //     )
    //     .to(yigoIcon, {
    //       scale: 12, // Scale up to fill most of the screen
    //       duration: 2,
    //       ease: "power2.inOut",
    //     })

    //     .to(yigoIcon, {
    //       opacity: 0,
    //       duration: 1,
    //       ease: "power2.inOut",
    //     });
    // }

    // Start video playback after reveal
    // .call(() => {
    //   if (video) {
    //     video.play().catch((error) => {
    //       console.log("Video autoplay prevented:", error);
    //     });
    //   }
    // });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // Remove scroll event listener
      window.removeEventListener("scroll", handleScroll);
      // Reset logo position when component unmounts or pathname changes
      const logo = document.getElementById("logo");
      if (logo) {
        gsap.set(logo, {
          clearProps: "all", // Clear all GSAP-set properties
        });
      }

      // Reset YIGO icon section when component unmounts
      // const yigoIconSection = document.getElementById("yigo-icon-section");
      // const yigoIcon = document.getElementById("yigo-icon");
      // if (yigoIconSection && yigoIcon) {
      //   gsap.set(yigoIconSection, {
      //     clearProps: "all", // Clear all GSAP-set properties
      //   });
      //   gsap.set(yigoIcon, {
      //     clearProps: "all", // Clear all GSAP-set properties
      //   });
      // }
    };
  }, [svgContent, isHomePage]);

  return (
    <div className="relative w-full h-full inset-0 flex items-center justify-center pointer-events-none">
      <svg
        ref={svgRef}
        width="100%"
        viewBox="800 100 800 800"
        className="max-w-full max-h-full h-screen"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
          opacity: 0, // Hide initially to prevent flash
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default AnimatedSkyline;
