/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const VideoSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section ref={containerRef} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* <motion.div
          style={{ opacity }}
          className="absolute top-20 z-20 text-center px-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
            YIGO RESIDENCES
          </h2>
        </motion.div> */}

        <motion.div
          style={{ scale, y }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <motion.div style={{ opacity }} className="relative w-full h-full ">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover  shadow-2xl"
            >
              <source
                src="https://yigogroup.ae/images/yigo_home_video.mp4"
                type="video/mp4"
              />
              {/* <source src="https://foldr.space/f/5MFEjSL0Md1UwqNS" type="video/mp4" /> */}
            </video>
            <div className="absolute inset-0 bg-black/30 " />
            <motion.div
              style={{ opacity }}
              className="absolute top-40 left-8 sm:left-12 lg:left-16 z-10 text-white max-w-2xl"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight text-left">
                WHERE CITIES EVOLVE,
                <br />
                <span className="">LEGACIES BEGIN.</span>
              </h2>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const CounterAnimation = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const duration = 2000;
    const startValue = 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg text-gray-600">{label}</div>
    </div>
  );
};

export default VideoSection;
