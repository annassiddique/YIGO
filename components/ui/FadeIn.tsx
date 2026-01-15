"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay (s) before the animation starts */
  delay?: number;
  /** Duration (s) of the animation */
  duration?: number;
  /** Translate on Y axis in pixels (positive moves down) */
  y?: number;
  /** Translate on X axis in pixels (positive moves right) */
  x?: number;
  /** If true, uses whileInView animation with once viewport */
  mode?: "immediate" | "inView";
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> &
  Omit<MotionProps, "initial" | "animate" | "whileInView" | "transition">;

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 30,
  x,
  mode = "immediate",
  ...rest
}: FadeInProps) {
  const initial = { opacity: 0, ...(y ? { y } : {}), ...(x ? { x } : {}) };
  const common = {
    transition: { duration, delay },
    className,
    ...rest,
  };

  if (mode === "inView") {
    return (
      <motion.div
        initial={initial}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        {...common}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, y: 0, x: 0 }}
      {...common}
    >
      {children}
    </motion.div>
  );
}
