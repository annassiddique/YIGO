/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const Newspage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [latestRef, latestInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Featured stories data
  const featuredStories = [
    {
      id: 1,
      title: "YIGO WINS GOLD AT THE ARCHITECTURE MADRID AWARDS 2025",
      excerpt:
        "YIGO Group has earned global recognition at the Architecture Madrid Awards 2025, winning Gold in Residential Architecture for its Dubai flagship project, CBD26.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      category: "News",
      featured: true,
      slug: "yigo-wins-gold-at-the-architecture-madrid-awards-2025",
      large: true,
    },
    {
      id: 2,
      title: "THE BEST FAMILY-FRIENDLY COMMUNITIES IN DUBAI (2025 GUIDE)",
      excerpt:
        "Dubai is home to some of the world's most thoughtfully planned residential communities. From Dubai Hills Estate and Arabian Ranches to the growing International City, each area offers unique benefits for family life.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      category: "News",
      featured: true,
      slug: "the-best-family-friendly-communities-in-dubai-2025-guide",
      large: false,
    },
  ];

  // Latest news data
  const latestNews = [
    {
      id: 3,
      title: "YIGO LAUNCHES A NEW ERA OF LIVING IN DUBAI'S INTERNATIONAL CITY",
      excerpt:
        "YIGO Group has officially launched its first Middle Eastern development, located at Plot CBD26 in Dubai's International City.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      category: "Press",
      slug: "yigo-launches-a-new-era-of-living-in-dubais-international-city",
    },
    {
      id: 4,
      title: "YIGO GROUP EXPANDS INTO DUBAI'S DYNAMIC REAL ESTATE MARKET",
      excerpt:
        "With over 23 years of experience in Asia and Europe, YIGO Group marks its strategic expansion into Dubai's real estate market. Known for combining architectural innovation with long-term value creation, YIGO brings a new standard of international living to the UAE.",
      image:
        "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
      category: "Press",
      slug: "yigo-group-expands-into-dubais-dynamic-real-estate-market",
    },
    {
      id: 5,
      title: "INVESTING IN DUBAI PROPERTY – THE PROS AND CONS YOU SHOULD KNOW",
      excerpt:
        "Dubai continues to rank among the most attractive real estate markets worldwide. Tax-free ownership, high rental yields, and world-class infrastructure make it a top destination for property investors.",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
      category: "Media",
      slug: "investing-in-dubai-property-the-pros-and-cons-you-should-know",
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "News":
        return "bg-accent-100 text-accent-800";
      case "Press":
        return "bg-primary-100 text-primary-800";
      case "Media":
        return "bg-neutral-100 text-neutral-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-16 pb-10 lg:pt-20 lg:pb-10 bg-white mt-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-2xl sm:text-5xl font-normal tracking-widest uppercase text-neutral-900">
              NEWS & MEDIA
            </h1>
            <p className="mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Discover the YIGO story as it unfolds — from landmark project
              launches to global milestones. Stay updated with the latest news,
              insights, and media highlights from YIGO Group's journey across,
              Hong Kong, Ireland, Saudi Arabia, and the UAE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section ref={featuredRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
              FEATURED STORIES
            </h2>
            <p className="text-lg text-neutral-600">
              Our most important news and announcements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group ${story.large ? "md:col-span-2" : ""}`}
              >
                <Link to={`/news-media/${story.slug}`}>
                  <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div
                      className={`relative overflow-hidden ${
                        story.large ? "h-64" : "h-48"
                      }`}
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium ${getCategoryColor(
                            story.category
                          )}`}
                        >
                          {story.category}
                        </span>
                        {story.featured && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section ref={latestRef} className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={latestInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl font-normal text-neutral-900 mb-4">
              LATEST NEWS
            </h2>
            <p className="text-lg text-neutral-600">
              All our recent news and updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                animate={latestInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/news-media/${news.slug}`}>
                  <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium ${getCategoryColor(
                            news.category
                          )}`}
                        >
                          {news.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3">
                        {news.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newspage;
