"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden bg-neutral-100"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h3
              className="font-heading text-2xl font-bold text-white text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
            >
              {project.title.toUpperCase()}
            </motion.h3>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2 group-hover:text-accent-600 transition-colors">
            {project.title.toUpperCase()}
          </h3>
          <p className="text-neutral-600 text-sm line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {project.category}
            </span>
            <span className="text-xs text-neutral-500">{project.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
