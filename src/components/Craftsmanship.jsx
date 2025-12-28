/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Craftsmanship = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-32 bg-white relative overflow-hidden sm:mt-12"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="font-normal text-[10vw] sm:text-7xl lg:text-[10vw]  text-neutral-900 tracking-wider leading-none relative z-10"
          >
            CRAFTSMANSHIP
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -top-3 sm:top-0 left-[0%] sm:left-[38%] w-full sm:w-auto z-0"
            style={{
              transform: "translate(-50%, -20%)",
            }}
          >
            <img
              src="/images/3dshape.webp"
              alt="3D Shape"
              className="w-lg h-56 sm:w-md sm:h-112 xl:w-md xl:h-112 object-contain max-w-full mx-auto"
            />
          </motion.div>
        </div>

        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl ml-auto mt-32 sm:mt-60 relative z-10"
        >
          <p className="text-lg text-neutral-600 leading-relaxed">
            Every detail is a testament to precision and passion. From the
            choice of materials to the finesse of finishing, each element
            reflects an unwavering commitment to quality. Spaces are not just
            built — they are crafted, shaped by artisanship that balances
            timeless elegance with modern functionality. The result is a home
            that feels refined, enduring, and truly personal.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Craftsmanship;
