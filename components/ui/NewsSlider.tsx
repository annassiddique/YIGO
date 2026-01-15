"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useLocale } from "next-intl";
import { getNewsItems, NewsItem } from "@/lib/data/news";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface NewsSliderProps {
  className?: string;
}

const NewsSlider: React.FC<NewsSliderProps> = ({ className = "" }) => {
  const locale = useLocale();
  const newsItems = getNewsItems(locale);
  return (
    <section className={`py-20 bg-neutral-50 ${className}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-normal text-neutral-900 mb-6">
            NEWS & MEDIA
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Stay updated with our latest achievements, announcements, and
            insights from the world of innovation and design.
          </p>
        </motion.div>

        {/* Swiper Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".news-swiper-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            className="news-swiper"
          >
            {newsItems.map((item: NewsItem, index: number) => {
              const isEvenSlide = index % 2 === 1; // 0-indexed, so 1st slide (index 0) is odd, 2nd slide (index 1) is even

              return (
                <SwiperSlide key={item.slug}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href={`/${locale}/news-media/${item.slug}`}>
                      <div className="overflow-hidden transition-all duration-300">
                        {/* Content Above Image (for even slides - 2nd, 4th, etc.) */}
                        {isEvenSlide && (
                          <div className="py-4">
                            {/* Title */}
                            <h3 className="font-heading text-xl font-medium text-neutral-500 mb-3 group-hover:text-accent-400 transition-colors duration-300 line-clamp-2">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            {/* <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4">
                              {item.excerpt}
                            </p> */}
                          </div>
                        )}

                        {/* Image Container */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <Image
                            src={item.image || "/images/news-award.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-accent-400 text-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Content Below Image (for odd slides - 1st, 3rd, etc.) */}
                        {!isEvenSlide && (
                          <div className="py-4">
                            {/* Title */}
                            <h3 className="font-heading text-xl font-medium text-neutral-500 mb-3 group-hover:text-accent-400 transition-colors duration-300 line-clamp-2">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            {/* <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4">
                              {item.excerpt}
                            </p> */}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8">
            <div className="news-swiper-pagination flex justify-center space-x-2"></div>
          </div>
        </motion.div>

        {/* View All News Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/news-media`}
            className="inline-flex items-center text-accent-400 hover:text-accent-500 font-medium transition-colors duration-300"
          >
            View All News & Media
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .news-swiper-pagination .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: #9aa0a6 !important;
          opacity: 1 !important;
          margin: 0 4px !important;
        }

        .news-swiper-pagination .swiper-pagination-bullet-active {
          background: #3c4043 !important;
        }

        .news-swiper .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </section>
  );
};

export default NewsSlider;
