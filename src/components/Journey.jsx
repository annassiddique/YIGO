/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CounterAnimation } from "./VideoSection";

const Counter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      let startTimestamp;
      const duration = 2000; // 2 seconds

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

const Journey = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-normal mb-6 leading-tight">
                THE YIGO JOURNEY:
              </h2>
              <h3 className="text-3xl lg:text-4xl font-normal text-gray-600 mb-8">
                HONG KONG → GLOBAL
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                Born in Hong Kong at the crossroads of East and West, YIGO
                embodies a spirit of vision, resilience, and action for the
                future.
              </p>
              <p className="text-lg text-gray-600">
                With global experience and innovative thinking, we create spaces
                that respond to each city's unique needs—redefining how the
                world lives.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative w-full h-48 overflow-hidden flex mt-8"
            >
              <div className="w-2/5 relative flex items-end">
                <div className="absolute bottom-0 right-0 pr-4">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="text-3xl font-medium text-gray-900"
                  >
                    RIYADH
                  </motion.div>
                </div>
              </div>
              <div className="w-3/5 relative overflow-hidden">
                <motion.div
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    inView
                      ? {
                          clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img
                    src="https://yigogroup.ae/_next/image?url=%2Fimages%2Friyadh.webp&w=1920&q=75"
                    alt="Riyadh"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full h-48 overflow-hidden flex"
            >
              <div className="w-2/5 relative flex items-end">
                <div className="absolute bottom-0 right-0 pr-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-3xl font-medium text-gray-900"
                  >
                    HONG KONG
                  </motion.div>
                </div>
              </div>
              <div className="w-3/5 relative overflow-hidden">
                <motion.div
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    inView
                      ? {
                          clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img
                    src="https://yigogroup.ae/_next/image?url=%2Fimages%2Fhongkong.webp&w=1920&q=75"
                    alt="Hong Kong"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full h-48 overflow-hidden flex lg:-translate-x-1/4"
            >
              <div className="w-2/5 relative flex items-end">
                <div className="absolute bottom-0 right-0 pr-4">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-3xl font-medium text-gray-900"
                  >
                    DUBAI
                  </motion.div>
                </div>
              </div>
              <div className="w-3/5 relative overflow-hidden">
                <motion.div
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    inView
                      ? {
                          clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img
                    src="https://yigogroup.ae/_next/image?url=%2Fimages%2Fdubai.webp&w=1920&q=75"
                    alt="Dubai"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative w-full h-48 overflow-hidden flex"
            >
              <div className="w-2/5 relative flex items-end">
                <div className="absolute bottom-0 right-0 pr-4">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="text-3xl font-medium text-gray-900"
                  >
                    IRELAND
                  </motion.div>
                </div>
              </div>
              <div className="w-3/5 relative overflow-hidden">
                <motion.div
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    inView
                      ? {
                          clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img
                    src="https://yigogroup.ae/_next/image?url=%2Fimages%2Fireland.webp&w=2048&q=75"
                    alt="Ireland"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 mt-16 border-t border-gray-200"
        >
          <Counter end={23} label="Years in Business" />
          <Counter end={5} label="Destinations" />
          <Counter end={100} label="Masterpieces" suffix="+" />
          <Counter end={3} label="Portfolio" suffix="bn" />
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
