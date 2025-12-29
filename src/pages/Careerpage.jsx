/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Careerpage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [positionsRef, positionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Benefits data
  const benefits = [
    {
      title: "COMPETITIVE SALARY",
      description:
        "We offer competitive compensation packages that reflect your skills and experience.",
    },
    {
      title: "HEALTH & WELLNESS",
      description: "Comprehensive health insurance.",
    },
    {
      title: "FLEXIBLE WORK",
      description:
        "Remote work options and flexible hours to support work-life balance.",
    },
    {
      title: "LEARNING & DEVELOPMENT",
      description:
        "Professional development budget and opportunities for growth.",
    },
    {
      title: "TEAM EVENTS",
      description: "Regular team building activities and company retreats.",
    },
    {
      title: "INNOVATION TIME",
      description:
        "Dedicated time to work on personal projects and explore new ideas.",
    },
  ];

  // Open positions data
  const positions = [
    {
      title: "Sales",
      department: "Sales",
      location: "Dubai",
      type: "Full-time",
      description:
        "Join our sales function to build strong client relationships, identify new opportunities, and drive growth through performance-driven strategies and results.",
    },
    {
      title: "Marketing",
      department: "Marketing",
      location: "Dubai",
      type: "Full-time",
      description:
        "Be part of a creative team that shapes brand perception, drives engagement, and delivers impactful campaigns across digital and traditional channels.",
    },
    {
      title: "Project Management",
      department: "Project Management",
      location: "Dubai",
      type: "Full-time",
      description:
        "Oversee projects from concept to completion, ensuring smooth coordination, timely delivery, and adherence to the highest quality standards.",
    },
    {
      title: "Engineering",
      department: "Engineering",
      location: "Dubai",
      type: "Full-time",
      description:
        "Play a key role in translating vision into structure — ensuring every project is built with precision, innovation, and technical excellence.",
    },
    {
      title: "Admin",
      department: "Admin",
      location: "Dubai",
      type: "Full-time",
      description:
        "Support the organization's daily operations through effective coordination, documentation, and communication across departments.",
    },
    {
      title: "Finance",
      department: "Finance",
      location: "Dubai",
      type: "Full-time",
      description:
        "Manage financial planning, budgeting, and reporting to maintain stability, optimize resources, and drive sustainable business growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-20 pt-16 pb-10 lg:pt-20 lg:pb-10 bg-white mt-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-2xl sm:text-5xl font-normal tracking-widest uppercase text-neutral-900">
              LOOKING FOR A CAREER WITH PURPOSE?
            </h1>
            <p className="mt-6 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              We're building a culture of innovation, collaboration, and growth.
              Join us in creating meaningful impact through exceptional work.
              Build Tomorrow, Today with YIGO.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section ref={positionsRef} className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-normal text-neutral-900 mb-6">
              OPEN POSITIONS
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our current openings and find the perfect role for your
              skills and interests.
            </p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={positionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      href={`mailto:Info@yigogroup.com?subject=Application%20for%20${encodeURIComponent(
                        position.title
                      )}%20Position`}
                      className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-[#F3F1EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-normal text-neutral-900 mb-6">
              DON'T SEE THE RIGHT ROLE?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              We're always looking for talented individuals to join our team.
              Send us your resume and let us know how you'd like to contribute.
            </p>
            <a
              href="mailto:Info@yigogroup.com?subject=General%20Application"
              className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-500 px-6 py-3 text-lg"
            >
              Send Your Resume
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careerpage;
