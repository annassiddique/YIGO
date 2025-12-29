/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NewsMedia = () => {
  const { t } = useTranslation('home');
  const { lang } = useParams();
  const currentLang = lang || 'en';
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const newsItems = [
    {
      title: t('news.articles.madridAward'),
      image:
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      category: t('news.categories.news'),
      imageFirst: false,
    },
    {
      title: t('news.articles.newEra'),
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      category: t('news.categories.press'),
      imageFirst: true,
    },
    {
      title: t('news.articles.expansion'),
      image:
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      category: t('news.categories.press'),
      imageFirst: false,
    },
    {
      title: t('news.articles.familyFriendly'),
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      category: t('news.categories.news'),
      imageFirst: true,
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, newsItems.length]);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
  }, [currentIndex, isMobile]);

  return (
    <section ref={ref} className="py-20 bg-neutral-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-normal text-neutral-900 mb-6">
            {t('news.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('news.description')}
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 md:snap-x md:snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group shrink-0 w-full md:w-[320px] md:snap-start"
              >
                <div className="overflow-hidden transition-all duration-300">
                  {/* Conditional rendering based on imageFirst */}
                  {item.imageFirst ? (
                    <>
                      {/* Title First */}
                      <div className="py-4">
                        <h3 className="text-xl font-medium text-neutral-500 mb-3 group-hover:text-cyan-500 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                      {/* Image Second */}
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className={` text-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className={` text-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="py-4">
                        <h3 className="text-xl font-medium text-neutral-500 mb-3 group-hover:text-cyan-500 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Dots - Mobile Only */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-neutral-800 w-8"
                    : "bg-neutral-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href={`/${currentLang}/news-media`}
            className="inline-flex items-center font-medium transition-colors duration-300"
          >
            {t('news.viewAll')}
            <ChevronRight className="ml-2 w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsMedia;