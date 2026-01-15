"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";

export default function CareersClient() {
  const tHero = useTranslations("careers.hero");
  const tBenefits = useTranslations("careers.benefits");
  const tPositions = useTranslations("careers.openPositions");
  const tCta = useTranslations("careers.cta");
  const openPositions = [
    {
      title: tPositions("positions.sales.title"),
      department: tPositions("positions.sales.department"),
      location: tPositions("positions.sales.location"),
      type: tPositions("positions.sales.type"),
      description: tPositions("positions.sales.description"),
    },
    {
      title: tPositions("positions.marketing.title"),
      department: tPositions("positions.marketing.department"),
      location: tPositions("positions.marketing.location"),
      type: tPositions("positions.marketing.type"),
      description: tPositions("positions.marketing.description"),
    },
    {
      title: tPositions("positions.projectManagement.title"),
      department: tPositions("positions.projectManagement.department"),
      location: tPositions("positions.projectManagement.location"),
      type: tPositions("positions.projectManagement.type"),
      description: tPositions("positions.projectManagement.description"),
    },
    {
      title: tPositions("positions.engineering.title"),
      department: tPositions("positions.engineering.department"),
      location: tPositions("positions.engineering.location"),
      type: tPositions("positions.engineering.type"),
      description: tPositions("positions.engineering.description"),
    },
    {
      title: tPositions("positions.admin.title"),
      department: tPositions("positions.admin.department"),
      location: tPositions("positions.admin.location"),
      type: tPositions("positions.admin.type"),
      description: tPositions("positions.admin.description"),
    },
    {
      title: tPositions("positions.finance.title"),
      department: tPositions("positions.finance.department"),
      location: tPositions("positions.finance.location"),
      type: tPositions("positions.finance.type"),
      description: tPositions("positions.finance.description"),
    },
  ];

  const benefits = [
    {
      title: tBenefits("competitiveSalary.title"),
      description: tBenefits("competitiveSalary.description"),
    },
    {
      title: tBenefits("healthWellness.title"),
      description: tBenefits("healthWellness.description"),
    },
    {
      title: tBenefits("flexibleWork.title"),
      description: tBenefits("flexibleWork.description"),
    },
    {
      title: tBenefits("learningDevelopment.title"),
      description: tBenefits("learningDevelopment.description"),
    },
    {
      title: tBenefits("teamEvents.title"),
      description: tBenefits("teamEvents.description"),
    },
    {
      title: tBenefits("innovationTime.title"),
      description: tBenefits("innovationTime.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-neutral-900 text-white">
        <PageHero
          title={tHero("title")}
          description={tHero("description")}
          className="py-20"
        />
      </div>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-4">
                  {benefit.title.toUpperCase()}
                </h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-normal text-neutral-900 mb-6">
              {tPositions("title")}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {tPositions("description")}
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-3">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                    <p className="text-neutral-600">{position.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <a
                      href={`mailto:Info@yigogroup.com?subject=${encodeURIComponent(
                        `Application for ${position.title} Position`
                      )}`}
                      className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors"
                    >
                      {tPositions("applyNow")}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-semibold text-neutral-900 mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                At YIGO, we believe that great work comes from great people. We
                foster an environment where creativity thrives, collaboration is
                encouraged, and everyone has the opportunity to grow and
                succeed.
              </p>
              <p className="text-lg text-neutral-600 mb-8">
                We value diversity, inclusion, and the unique perspectives that
                each team member brings to our projects and our company.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square bg-neutral-100"></div>
                <div className="aspect-square bg-neutral-100"></div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square bg-neutral-100"></div>
                <div className="aspect-square bg-neutral-100"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-[#F3F1EF] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-normal text-neutral-900 mb-6">
              {tCta("title")}
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              {tCta("description")}
            </p>
            <Button
              size="lg"
              className="bg-neutral-500 text-neutral-900 hover:bg-neutral-100"
              onClick={() => {
                window.location.href = "mailto:Info@yigogroup.com";
              }}
            >
              {tCta("sendResume")}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
