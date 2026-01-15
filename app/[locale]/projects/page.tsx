"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
// import { useLocale } from "next-intl";
// import { projects } from "@/lib/data/projects";
// import ProjectCard from "@/components/ui/ProjectCard";
// import PageHero from "@/components/ui/PageHero";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

export default function ProjectsPage() {
  const t = useTranslations("projects.page");
  // const locale = useLocale();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-neutral-900 text-white">
        {/* <PageHero
          title="OUR PROJECTS"
          description=""
          className="!lg:pt-4 pb-0 -mb-10 -mt-10 "
        /> */}

        <section className={` pt-16 pb-0 lg:pt-20 lg:pb-0 bg-white mt-10 `}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-heading text-2xl sm:text-5xl font-normal tracking-widest uppercase text-neutral-900">
                {t("title")}
              </h1>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Project Slider */}
      <section className="py-10">
        <ProjectCarousel />
      </section>

      {/* Projects Grid */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-normal text-neutral-900 mb-6">
              INTERESTED IN OUR PROJECTS?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Let&#39;s connect and explore how we can bring your ideas to life
              with innovative design and sustainable solutions.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-neutral-900  hover:bg-neutral-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a Call
            </motion.a>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
