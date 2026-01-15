"use client";

import React from "react";
import { motion } from "framer-motion";

type PageHeroProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function PageHero({
  title,
  description,
  className,
}: PageHeroProps) {
  return (
    <section className={`${className ?? ""} pt-16 pb-10 lg:pt-20 lg:pb-10 bg-white mt-20 `}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-heading text-2xl sm:text-5xl font-normal tracking-widest uppercase text-neutral-900">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
