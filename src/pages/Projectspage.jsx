/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import ProjectCarousel from "../components/ProjectCarousel";
import Header from "../components/Header";

const Projectspage = () => {
  const { t } = useTranslation('projects');
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
      name: t('projectNames.beihu'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fbeihu-splendor-residence%2Fcover.webp&w=750&q=75",
    },
    {
      name: t('projectNames.donghu'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fdonghu-international-hotel%2Fcover.webp&w=640&q=75",
    },
    {
      name: t('projectNames.mansion'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fmansion-court-hotel-apartment%2Fcover.webp&w=750&q=75",
    },
    {
      name: t('projectNames.moher'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fmoher-cloud-cape-villas%2Fcover.webp&w=750&q=75",
    },
    {
      name: t('projectNames.yigo26'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fyigo-residence%2Fcover.jpg&w=828&q=75",
    },
    {
      name: t('projectNames.zhongzhou'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fzhongzhou-one-residence%2F1.webp&w=750&q=75",
    },
    {
      name: t('projectNames.jiangxi'),
      image:
        "https://yigogroup.ae/_next/image?url=%2Fimages%2Fprojects%2Fjiangxi-international-business-center%2F1.webp&w=750&q=75",
    },
    {
      name: t('projectNames.minle'),
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
                {t('title')}
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