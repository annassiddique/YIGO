/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('about');
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
            src="https://yigogroup.ae/_next/image?url=%2Fimages%2Fabout_header.png&w=828&q=75"
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
              {t('hero.title')}
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
                {t('title')}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-7xl mx-auto mb-16 font-light space-y-6"
              >
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('content.para1')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('content.para2')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('content.para3')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('content.para4')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('content.para5')}
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
                  <Counter end={23} label={t('stats.years')} />
                  <Counter end={5} label={t('stats.destinations')} />
                  <Counter end={100} label={t('stats.masterpieces')} suffix="+" />
                  <Counter end={3} label={t('stats.portfolio')} suffix="bn" />
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <img
                  src="https://yigogroup.ae/_next/image?url=%2Fimages%2Fabout_us.png&w=3840&q=75"
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
                {t('leadership.title')}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-7xl mx-auto font-light space-y-6"
              >
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('leadership.para1')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('leadership.para2')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('leadership.para3')}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('leadership.para4')}
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
                {t('ceo.title')}
              </h2>
              <p className="text-lg text-neutral-700 mb-8 text-left font-light">
                {t('ceo.subtitle')}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-7xl font-light space-y-4"
              >
                <p className="text-base text-neutral-700 leading-relaxed">
                  {t('ceo.para1')}
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  {t('ceo.para2')}
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  {t('ceo.para3')}
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  {t('ceo.para4')}
                </p>
                <p className="text-base text-neutral-700 mb-6 leading-relaxed">
                  {t('ceo.signature')}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={visionInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-start"
                >
                  <img
                    src="https://yigogroup.ae/_next/image?url=%2Fimages%2Fabout_sign.png&w=256&q=75"
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