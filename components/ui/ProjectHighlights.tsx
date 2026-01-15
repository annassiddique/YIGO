"use client";

import React from "react";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

interface HighlightItem {
  value: string;
  label: string;
}

interface ProjectHighlightsProps {
  highlights:
    | {
        totalArea: string;
        totalAreaZh: string;
        totalAreaTitle: string;
        totalAreaTitleZh: string;
        units: string;
        unitsTitle: string;
        unitsTitleZh: string;
        towers: string;
        towersZh: string;
        towersTitle: string;
        towersTitleZh: string;
        commercialTowers: string;
        commercialTowersZh: string;
        commercialTowersTitle: string;
        commercialTowersTitleZh: string;
      }
    | undefined;
  locale?: string;
  className?: string;
}

export default function ProjectHighlights({
  highlights,
  locale = "en",
  className = "",
}: ProjectHighlightsProps) {
  if (!highlights) {
    return null;
  }

  const isZh = locale === "zh";

  const highlightItems: HighlightItem[] = [
    {
      value: highlights.units,
      label: isZh ? highlights.unitsTitleZh : highlights.unitsTitle,
    },
    {
      value: highlights.towers,
      label: isZh ? highlights.towersTitleZh : highlights.towersTitle,
    },
    {
      value: highlights.commercialTowers,
      label: isZh
        ? highlights.commercialTowersTitleZh
        : highlights.commercialTowersTitle,
    },
    {
      value: highlights.totalArea,
      label: isZh ? highlights.totalAreaTitleZh : highlights.totalAreaTitle,
    },
  ].filter(
    (item) =>
      item.value &&
      item.value.trim() !== "" &&
      item.label &&
      item.label.trim() !== ""
  );

  return (
    <FadeIn delay={0.05} className={`mb-16 ${className}`}>
      <div className="">
        {/* <h2 className="font-heading text-3xl md:text-4xl font-normal text-neutral-900 mb-8">
          HIGHLIGHTS
        </h2> */}
        <div
          className={`grid gap-8 font-light ${
            highlightItems.length === 1
              ? "grid-cols-1"
              : highlightItems.length === 2
              ? "grid-cols-2"
              : highlightItems.length === 3
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {highlightItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-left border-l border-neutral-300 pl-4"
            >
              <div className="font-body text-3xl md:text-4xl font-semibold text-neutral-900 mb-2">
                {item.value}
              </div>
              <div className="font-body text-base md:text-lg text-neutral-600 font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
