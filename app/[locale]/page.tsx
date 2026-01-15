"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Statistics from "@/components/ui/Statistics";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import ContactForm from "@/components/ui/ContactForm";
// import FullScreenSlider from "@/components/ui/FullScreenSlider";
import NewsSlider from "@/components/ui/NewsSlider";
import AnimatedSkyline from "@/components/ui/AnimatedSkyline";
import AmenitiesSlider from "@/components/ui/amenitiesSlider";


export default function Home() {
  const t = useTranslations("home");
  const tStats = useTranslations("home.statistics");

  const statistics = [
    { value: 23, label: tStats("yearsInBusiness") },
    { value: 5, label: tStats("destinations"), minIntegerDigits: 2 },
    { value: 100, label: tStats("masterpieces"), suffix: "+" },
    { value: 3, label: tStats("portfolio"), prefix: "$", suffix: "bn" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      {/* Scroll Indicator */}
      <motion.div
        id="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed top-[calc(100%-10rem)] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center mb-3">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-black rounded-full mt-2"
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-sm text-black font-medium tracking-wide"
        >
          {t("scrollToBegin")}
        </motion.p>
      </motion.div>
      <section className="relative flex items-center justify-center z-10 -mb-[100vh]">
        {/* Animated SVG Skyline */}
        <AnimatedSkyline />
      </section>
      <section
        className="relative w-full h-screen"
        id="video-section"
        style={{ opacity: 0 }}
      >
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-0 top-0 w-full h-full object-cover"
        >
          <source src="/images/yigo_home_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute left-0 top-0 w-full bg-black/40 " />

        {/* Text Overlay - Top Left */}
        <div
          id="video-title"
          className="absolute top-40 left-8 sm:left-12 lg:left-16 z-10 text-white max-w-2xl"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight text-left">
            {t("hero.title")}
            <br />
            <span className="text-accent-400">{t("hero.subtitle")}</span>
          </h2>
        </div>
      </section>
      {/* YIGO Journey Section */}
      <section id="content-below-hero" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Section - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-4xl lg:text-5xl font-normal text-neutral-900 mb-6">
                  {t("journey.title")}
                </h2>
                <h3 className="font-heading text-3xl lg:text-4xl font-normal text-neutral-900 mb-8">
                  {t("journey.subtitle")}
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-neutral-600">
                  {t("journey.description1")}
                </p>
                <p className="text-lg text-neutral-600">
                  {t("journey.description2")}
                </p>
              </div>

              {/* Riyadh City - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 relative w-full h-48 overflow-hidden flex"
              >
                {/* Left section - White background with text */}
                <div className="w-2/5 relative flex items-end">
                  <div className="absolute bottom-0 right-0 pr-4">
                    <motion.div
                      className="text-3xl font-medium text-neutral-900"
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 1.0,
                        ease: "easeOut",
                      }}
                    >
                      {t("cities.riyadh")}
                    </motion.div>
                  </div>
                </div>

                {/* Right section - Image with clip-path animation */}
                <motion.div
                  className="w-3/5 relative overflow-hidden"
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  whileInView={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  <Image
                    src="/images/riyadh.webp"
                    alt="Riyadh cityscape"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section - City Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Hong Kong - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full h-48 overflow-hidden flex"
              >
                {/* Left section - White background with text */}
                <div className="w-2/5 relative flex items-end">
                  <div className="absolute bottom-0 right-0 pr-4">
                    <motion.div
                      className="text-3xl font-medium text-neutral-900"
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6,
                        ease: "easeOut",
                      }}
                    >
                      {t("cities.hongKong")}
                    </motion.div>
                  </div>
                </div>

                {/* Right section - Image with clip-path animation */}
                <motion.div
                  className="w-3/5 relative overflow-hidden"
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  whileInView={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src="/images/hongkong.webp"
                    alt="Hong Kong skyline"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Dubai - Middle Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative w-full h-48 overflow-hidden flex lg:-translate-x-1/4"
              >
                {/* Left section - White background with text */}
                <div className="w-2/5 relative flex items-end">
                  <div className="absolute bottom-0 right-0 pr-4">
                    <motion.div
                      className="text-3xl font-medium text-neutral-900"
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      {t("cities.dubai")}
                    </motion.div>
                  </div>
                </div>

                {/* Right section - Image with clip-path animation */}
                <motion.div
                  className="w-3/5 relative overflow-hidden"
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  whileInView={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src="/images/dubai.webp"
                    alt="Dubai skyline"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Ireland - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative w-full h-48 overflow-hidden flex"
              >
                {/* Left section - White background with text */}
                <div className="w-2/5 relative flex items-end">
                  <div className="absolute bottom-0 right-0 pr-4">
                    <motion.div
                      className="text-3xl font-medium text-neutral-900"
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 1.0,
                        ease: "easeOut",
                      }}
                    >
                      {t("cities.ireland")}
                    </motion.div>
                  </div>
                </div>

                {/* Right section - Image with clip-path animation */}
                <motion.div
                  className="w-3/5 relative overflow-hidden"
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  whileInView={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  <Image
                    src="/images/ireland.webp"
                    alt="Ireland landscape"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="pt-8 pb-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Statistics stats={statistics} className="mb-16" />
        </div>
      </section>

      {/* Dubai Project Video Section */}
      <section className="relative w-full h-full max-w-7xl mx-auto overflow-hidden">
        {/* Title overlay at the top */}
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-primary-500 mb-20"
          >
            <h2 className="font-heading text-[10vw] sm:text-7xl lg:text-8xl font-light text-neutral-900 tracking-wider leading-none relative z-10">
              {/* <h2 className="font-heading text-4xl px-4 sm:px-0 lg:text-5xl font-normal text-neutral-900 mb-6"> */}
              {t("dubaiProject.title")}
            </h2>
          </motion.div>
        </div>
        <motion.section
          initial={{ opacity: 0, y: 400 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false }}
          className="relative w-full h-[45vh] md:h-[80vh] max-w-7xl mx-auto -mb-8 "
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/dubai_project.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.section>
        {/* Optional overlay for better text readability if needed */}
        {/* <div className="absolute left-0 top-0 w-full h-full bg-black/20" /> */}
      </section>
      {/* YIGO Icon Full Screen Section */}
      {/* <section
        id="yigo-icon-section"
        className="relative w-full h-screen flex items-center justify-center"
      >
        <div id="yigo-icon-container" className="relative">
          <Image
            src="/images/YIGO_icon.svg"
            alt="YIGO Icon"
            width={200}
            height={200}
            className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
            id="yigo-icon"
          />
        </div>
      </section> */}

      {/* Featured Projects Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-full mx-auto px-- sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl px-4 sm:px-0 lg:text-5xl font-normal text-neutral-900 mb-6">
              {t("featuredProjects.title")}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto px-4 sm:px-0">
              {t("featuredProjects.description")}
            </p>
          </motion.div>

          <ProjectCarousel />
        </div>
      </section>

      {/* Full Screen Slider */}
      {/* <FullScreenSlider /> */}
      <AmenitiesSlider />

      {/* Craftsmanship Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <h2 className="font-heading text-[10vw] sm:text-7xl lg:text-[11vw] font-light text-neutral-900 tracking-wider leading-none relative z-10">
              {t("craftsmanship.title")}
            </h2>

            {/* 3D Shape positioned in center with slight offset */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ duration: 5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 w-full sm:w-auto transform -translate-x-1/2 translate-y-[-20%] -z-0"
              style={{
                transform: "translate(-50%, 50%) translate(10px, 50px)",
              }}
            >
              <Image
                src="/images/3dshape.png"
                alt="3D Shape"
                width={400}
                height={400}
                className="w-[32rem] h-[14rem] sm:w-[28rem] sm:h-[28rem] xl:w-[28rem] xl:h-[28rem] object-contain max-w-full"
              />
            </motion.div>
          </motion.div>

          {/* Body Text - Bottom Right Quadrant */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl ml-auto mt-32 sm:mt-60 relative z-10"
          >
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              {t("craftsmanship.description")}
            </p>
          </motion.div>
        </div>
      </section>
      {/* 
      <div className="relative w-full aspect-video overflow-hidden max-w-7xl mx-auto">
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/yigo_home_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}

      {/* News & Media Section */}
      <NewsSlider />

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <ContactForm />
      </section>
    </div>
  );
}
