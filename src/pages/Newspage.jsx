/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const Newspage = () => {
  const { t } = useTranslation('news');
  const { lang } = useParams();
  const currentLang = lang || 'en';

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
      title: t('articles.madridAward.title'),
      excerpt: t('articles.madridAward.excerpt'),
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      category: t('categories.news'),
      featured: true,
      slug: "yigo-wins-gold-at-the-architecture-madrid-awards-2025",
      large: true,
    },
    {
      id: 2,
      title: t('articles.familyFriendly.title'),
      excerpt: t('articles.familyFriendly.excerpt'),
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      category: t('categories.news'),
      featured: true,
      slug: "the-best-family-friendly-communities-in-dubai-2025-guide",
      large: false,
    },
  ];

  // Latest news data
  const latestNews = [
    {
      id: 3,
      title: t('articles.newEra.title'),
      excerpt: t('articles.newEra.excerpt'),
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      category: t('categories.press'),
      slug: "yigo-launches-a-new-era-of-living-in-dubais-international-city",
    },
    {
      id: 4,
      title: t('articles.expansion.title'),
      excerpt: t('articles.expansion.excerpt'),
      image:
        "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
      category: t('categories.press'),
      slug: "yigo-group-expands-into-dubais-dynamic-real-estate-market",
    },
    {
      id: 5,
      title: t('articles.investing.title'),
      excerpt: t('articles.investing.excerpt'),
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
      category: t('categories.media'),
      slug: "investing-in-dubai-property-the-pros-and-cons-you-should-know",
    },
  ];

  const getCategoryColor = (category) => {
    const newsLabel = t('categories.news');
    const pressLabel = t('categories.press');
    const mediaLabel = t('categories.media');

    if (category === newsLabel) {
      return "bg-accent-100 text-accent-800";
    } else if (category === pressLabel) {
      return "bg-primary-100 text-primary-800";
    } else if (category === mediaLabel) {
      return "bg-neutral-100 text-neutral-800";
    }
    return "bg-gray-100 text-gray-800";
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
              {t('title')}
            </h1>
            <p className="mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
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
              {t('featuredStories')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('featuredDesc')}
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
                <Link to={`/${currentLang}/news-media/${story.slug}`}>
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
                            {t('featured')}
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
              {t('latestNews')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('latestDesc')}
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
                <Link to={`/${currentLang}/news-media/${news.slug}`}>
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