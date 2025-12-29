/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header";

// Counter Animation Component
const Counter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const duration = 2000;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-left border-l border-neutral-300 pl-4">
      <div className="text-6xl font-normal text-neutral-900 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg text-neutral-600">{label}</div>
    </div>
  );
};

const Aboutpage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [leadershipRef, leadershipInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <img
            src="/public/images/project/1.jpg"
            alt="YIGO Development"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-6xl lg:text-8xl font-light text-white text-center tracking-wide"
            >
              THE YIGO STORY
            </motion.h1>
          </div>
        </section>

        {/* About YIGO Development */}
        <section className="py-20" ref={aboutRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-5xl lg:text-6xl font-light mb-12 text-neutral-900"
              >
                ABOUT YIGO DEVELOPMENT
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-7xl mx-auto mb-16 font-light space-y-6"
              >
                <p className="text-lg text-neutral-700 leading-relaxed">
                  YIGO began with a bold vision: to transform skylines and
                  communities by blending architectural ambition, cultural
                  insight, and global reach. From its roots in China, YIGO has
                  charted an expansive journey — From developing landmark
                  residential and mixed-use projects across mainland China, to
                  establishing our headquarters in Hong Kong and expanding into
                  Ireland and Saudi Arabia — and now further into Dubai and the
                  broader Middle East region.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Each step in this journey reflects our core belief: built
                  environments should be more than structures — they should
                  nurture lives, connect people, and support sustainable growth.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Our story is one of evolution. In China, we laid our
                  foundation with projects that balance scale and creativity.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  As our confidence and capabilities grew, our vision became
                  increasingly global — from Victoria Harbour Residences in Hong
                  Kong, to elegant villa communities in Ireland; from serviced
                  apartment developments in Saudi Arabia, to our latest ventures
                  in Dubai and the wider Middle East, where we integrate smart
                  planning, green spaces, and sustainable living ecosystems.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Wherever we are, YIGO remains committed to local insight,
                  international standards, and continuous innovation.
                </p>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-7xl mx-auto flex justify-center mb-16"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-light w-full lg:w-4/5">
                  <Counter end={23} label="Years in Business" />
                  <Counter end={5} label="Destinations" />
                  <Counter end={100} label="Masterpieces" suffix="+" />
                  <Counter end={3} label="Portfolio" suffix="bn" />
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <img
                  src="/public/images/skyline.png"
                  alt="Global Cityscape"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leading with Excellence */}
        <section className="py-20" ref={leadershipRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-5xl lg:text-6xl font-light mb-12 text-neutral-900"
              >
                LEADING WITH EXCELLENCE
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-7xl mx-auto font-light space-y-6"
              >
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Since its inception and the establishment of its Hong Kong
                  headquarters, YIGO Group has evolved into a global enterprise
                  with a clear mission — to redefine urban living through
                  innovation, resilience, and purpose-driven growth.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  From Hong Kong, YIGO has steadily expanded its footprint to
                  Ireland and Saudi Arabia, delivering landmark projects across
                  diverse markets. Today, our Dubai operations, led by Cheung
                  Kong International Real Estate Development, serve as a
                  strategic hub for our expansion into the Middle East.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  This international presence reflects our vision — to create
                  developments that transcend geographic boundaries.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  At YIGO, real estate development is more than business — it is
                  our legacy. Guided by innovation, responsibility, and
                  sustainability, we design spaces that respond to each city's
                  unique character while setting new standards for global
                  living. We believe that great places are built by great
                  people, and our culture of collaboration and excellence
                  ensures that every project we deliver leaves a lasting mark on
                  the world.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <section className="py-20 bg-[#F3F1EF]" ref={visionRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl lg:text-6xl font-light mb-6 text-neutral-900 text-left">
                DRIVEN BY VISION.
                <br />
                GROUNDED IN EXPERIENCE.
              </h2>
              <p className="text-lg text-neutral-700 mb-8 text-left font-light">
                Building the ideal coordinates for quality of life in Dubai
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-7xl font-light space-y-4"
              >
                <p className="text-base text-neutral-700 leading-relaxed">
                  Dubai, a global metropolis known for its legend and vigour,
                  not only attracts elite clients and investors from all over
                  the world, but also carries the aspirations of countless
                  Dubaiites for a high-class life. As the CEO of Yigo Group
                  (development), I am always thinking: how can we use our
                  expertise to create ideal homes with both living quality and
                  investment value for this group of people who pursue
                  excellence?
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Their requirements for living are never "just enough": the
                  ultimate in spatial design, the exquisite pursuit of living
                  details, and the quality of high-end living in a foreign
                  country; and for investment, they value "quality-driven
                  value-added". For investment, they are more interested in
                  "quality-driven appreciation" — only quality assets that can
                  stand the test of time can match their long-term expectations
                  for the future.
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Over the 20 years, I have visited many of our clients' homes
                  and had in-depth dialogues with global investors. We have
                  deeply integrated Hong Kong's cutting-edge high-end living
                  concepts with Dubai's local needs, and turned every demand for
                  quality and every expectation for detail into the core
                  direction of project development. We are never satisfied with
                  "building houses", but insist on "sculpting quality human
                  settlements" — not only to allow residents to enjoy high-end
                  living experiences beyond expectations, but also to allow
                  investors to reap the benefits of quality and robust
                  value-added returns.
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  We will not only let the residents enjoy a high-end living
                  experience that exceeds their expectations, but also let the
                  investors enjoy a steady return on their investment empowered
                  by quality. This is the long-term mission that the Yigo team
                  and I are committed to in Dubai, and it is also our commitment
                  to quality.
                </p>
                <p className="text-base text-neutral-700 mb-6 leading-relaxed">
                  CEO YIGO GROUP
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={visionInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-start"
                >
                  <img
                    src="/public/images/CEO_Signature.png"
                    alt="CEO Signature"
                    className="w-48 h-auto object-contain"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Aboutpage;
