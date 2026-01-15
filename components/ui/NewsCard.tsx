import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { NewsItem } from "@/lib/data/news";

interface NewsCardProps {
  newsItem: NewsItem;
  index?: number;
  featured?: boolean;
}

export default function NewsCard({
  newsItem,
  index = 0,
  featured = false,
}: NewsCardProps) {
  const tCategories = useTranslations("news.categories");
  const tFeatured = useTranslations("news");
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <Link href={`/news-media/${newsItem.slug}`}>
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          {newsItem.image && (
            <div
              className={`relative overflow-hidden ${
                featured ? "h-64" : "h-48"
              }`}
            >
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={
                  featured
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-1 text-xs font-medium ${
                  newsItem.category === "news"
                    ? "bg-accent-100 text-accent-800"
                    : newsItem.category === "press"
                    ? "bg-primary-100 text-primary-800"
                    : "bg-neutral-100 text-neutral-800"
                }`}
              >
                {tCategories(newsItem.category)}
              </span>
              {newsItem.featured && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                  {tFeatured("featured")}
                </span>
              )}
            </div>
            <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
              {newsItem.title.toUpperCase()}
            </h3>
            <p className="text-neutral-600 text-sm line-clamp-3">
              {newsItem.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
