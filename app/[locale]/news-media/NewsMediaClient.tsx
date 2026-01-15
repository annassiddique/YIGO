// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { useLocale, useTranslations } from "next-intl";
// import { getNewsItems } from "@/lib/data/news";
// import NewsCard from "@/components/ui/NewsCard";
// import PageHero from "@/components/ui/PageHero";

// export default function NewsMediaClient() {
//   const locale = useLocale();
//   const t = useTranslations("news.page");
//   const tFeatured = useTranslations("news.page.featuredStories");
//   const tLatest = useTranslations("news.page.latestNews");
//   const newsItems = getNewsItems(locale);
//   const featuredNews = newsItems.filter((item) => item.featured);
//   const regularNews = newsItems.filter((item) => !item.featured);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <PageHero title={t("title")} description={t("description")} />

//       {/* Featured News */}
//       {featuredNews.length > 0 && (
//         <section className="py-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="mb-12"
//             >
//               <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
//                 {tFeatured("title")}
//               </h2>
//               <p className="text-lg text-neutral-600">
//                 {tFeatured("description")}
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredNews.map((newsItem, index) => (
//                 <NewsCard
//                   key={newsItem.slug}
//                   newsItem={newsItem}
//                   index={index}
//                   featured={index === 0}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* All News */}
//       <section className="py-20 bg-neutral-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="mb-12"
//           >
//             <h2 className="font-heading text-3xl font-normal text-neutral-900 mb-4">
//               {tLatest("title")}
//             </h2>
//             <p className="text-lg text-neutral-600">{tLatest("description")}</p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {regularNews.map((newsItem, index) => (
//               <NewsCard key={newsItem.slug} newsItem={newsItem} index={index} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getNewsItems } from "@/lib/data/news";
import NewsCard from "@/components/ui/NewsCard";
import PageHero from "@/components/ui/PageHero";

export default function NewsMediaClient() {
  const locale = useLocale();
  const t = useTranslations("news.page");
  const tFeatured = useTranslations("news.page.featuredStories");
  const tLatest = useTranslations("news.page.latestNews");
  const tBlog = useTranslations("news.page.latestBlog");

  const newsItems = getNewsItems(locale);
  const featuredNews = newsItems.filter((item) => item.featured);
  const regularNews = newsItems.filter(
    (item) =>
      !item.featured && (item.category === "news" || item.category === "press")
  );
  const blogPosts = newsItems.filter((item) => item.category === "blog");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero title={t("title")} description={t("description")} />

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
                {tFeatured("title")}
              </h2>
              <p className="text-lg text-neutral-600">
                {tFeatured("description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.map((newsItem, index) => (
                <NewsCard
                  key={newsItem.slug}
                  newsItem={newsItem}
                  index={index}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl font-normal text-neutral-900 mb-4">
              {tLatest("title")}
            </h2>
            <p className="text-lg text-neutral-600">{tLatest("description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((newsItem, index) => (
              <NewsCard key={newsItem.slug} newsItem={newsItem} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      {blogPosts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading text-3xl font-normal text-neutral-900 mb-4">
                {tBlog("title")}
              </h2>
              <p className="text-lg text-neutral-600">{tBlog("description")}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((blogPost, index) => (
                <NewsCard
                  key={blogPost.slug}
                  newsItem={blogPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
