"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";

interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  minIntegerDigits?: number;
}

interface StatisticsProps {
  stats: StatItem[];
  className?: string;
}

export default function Statistics({ stats, className = "" }: StatisticsProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 font-light ${className}`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-left border-l border-neutral-300 pl-4"
        >
          <div className="font-body text-6xl font-normal text-neutral-900 mb-2">
            <CountUp
              to={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              minIntegerDigits={stat.minIntegerDigits}
            />
          </div>
          <div className="font-body text-lg text-neutral-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
