"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Statistics from "@/components/ui/Statistics";

export default function AboutClient() {
  const t = useTranslations("about");
  const tAboutYigo = useTranslations("about.aboutYigo");
  const tExcellence = useTranslations("about.excellence");
  const tVision = useTranslations("about.vision");
  const tStats = useTranslations("home.statistics");

  const statistics = [
    { value: 23, label: tStats("yearsInBusiness") },
    { value: 5, label: tStats("destinations"), minIntegerDigits: 2 },
    { value: 100, label: tStats("masterpieces"), suffix: "+" },
    { value: 3, label: tStats("portfolio"), prefix: "$", suffix: "bn" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Full Screen Header */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/about_header.png"
          alt="YIGO Development"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-heading text-6xl lg:text-8xl font-light text-white text-center"
          >
            {t("title")}
          </motion.h1>
        </div>
      </section>

      {/* Section 1: ABOUT YIGO DEVELOPMENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl font-light mb-12 text-neutral-900">
              {tAboutYigo("title")}
            </h1>

            <div className="max-w-7xl mx-auto mb-16 font-light">
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tAboutYigo("description1")}
              </p>
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tAboutYigo("description2")}
              </p>
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tAboutYigo("description3")}
              </p>
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tAboutYigo("description4")}
              </p>
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tAboutYigo("description5")}
              </p>
            </div>

            {/* Statistics */}
            <div className="max-w-7xl mx-auto flex justify-center">
              <Statistics
                stats={statistics}
                className="mb-16 w-full lg:w-4/5"
              />
            </div>

            {/* Cityscape Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-0"
            >
              <Image
                src="/images/about_us.png"
                alt="Global Cityscape"
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: LEADING WITH EXCELLENCE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-5xl lg:text-6xl font-light mb-12 text-neutral-900">
              {tExcellence("title")}
            </h2>

            <div className="max-w-7xl mx-auto font-light">
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tExcellence("description1")}
              </p>
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tExcellence("description2")}
              </p>
              <p className="font-body text-lg text-neutral-700 mb-6 leading-relaxed">
                {tExcellence("description3")}
              </p>
              <p className="font-body text-lg text-neutral-700 leading-relaxed">
                {tExcellence("description4")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: DRIVEN BY VISION. GROUNDED IN EXPERIENCE. */}
      <section className="py-20 bg-[#F3F1EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl lg:text-6xl font-light mb-6 text-neutral-900 text-left">
              {tVision("title")}
            </h2>

            <p className="font-body font-light text-lg text-neutral-700 mb-4 text-left">
              {tVision("subtitle")}
            </p>

            <div className="max-w-7xl font-light ">
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                {tVision("description1")}
              </p>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                {tVision("description2")}
              </p>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                {tVision("description3")}
              </p>
              <p className="font-body text-base text-neutral-700 mb-6 leading-relaxed">
                {tVision("description4")}
              </p>

              <p className="font-body text-base text-neutral-700 mb-6 leading-relaxed">
                {tVision("ceo")}
              </p>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex justify-start"
              >
                <Image
                  src="/images/about_sign.png"
                  alt="CEO Signature"
                  width={192}
                  height={151}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
