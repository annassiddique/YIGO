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
    {
      name: "Beihu Splendor Residence",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fbeihu-splendor-residence%2Fcover.webp&w=750&q=75",
    },
    {
      name: "Donghu International Hotel",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fdonghu-international-hotel%2Fcover.webp&w=640&q=75",
    },
    {
      name: "Mansion Court Hotel Apartment",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fmansion-court-hotel-apartment%2Fcover.webp&w=750&q=75",
    },
    {
      name: "Moher Cloud Cape Villas",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fmoher-cloud-cape-villas%2Fcover.webp&w=750&q=75",
    },
    {
      name: "YIGO26 International City – Dubai",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fyigo-residence%2Fcover.jpg&w=828&q=75",
    },
    {
      name: "Zhongzhou One Residence",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fzhongzhou-one-residence%2F1.webp&w=750&q=75",
    },
    {
      name: "Jiangxi International Business Center",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fjiangxi-international-business-center%2F1.webp&w=750&q=75",
    },
    {
      name: "Minle Culture & Creative Park",
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fminle-culture-creative-park%2F1.webp&w=640&q=75",
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
