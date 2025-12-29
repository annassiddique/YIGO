/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCarousel from "../components/ProjectCarousel";
import Header from "../components/Header";

const Projectspage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [carouselRef, carouselInView] = useInView({
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

  return (
    <>
      <div className="mt-12 bg-white">
        {/* Projects Carousel Section */}
        <section ref={carouselRef} className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={carouselInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="text-5xl lg:text-6xl font-light text-neutral-900 mb-6">
                OUR PROJECTS
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={carouselInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProjectCarousel projects={projects} showTitle={false} />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projectspage;
