import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug } from "@/lib/data/projects";
// import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import Hero from "@/components/ui/Hero";
import ImageSlider from "@/components/ui/ImageSlider";
import ProjectHighlights from "@/components/ui/ProjectHighlights";
import ContactForm from "@/components/ui/ContactForm";
import FloorPlanGrid from "@/components/ui/FloorPlanGrid";
import FloorPlanSlider from "@/components/ui/FloorPlanSlider";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const { projects } = await import("@/lib/data/projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  const t = await getTranslations("projects.detail");

  if (!project) {
    notFound();
  }

  // Get the appropriate content based on locale
  const title = locale === "zh" ? project.titleZh : project.title;
  const description =
    locale === "zh" ? project.descriptionZh : project.description;
  const keyFeatures =
    locale === "zh" ? project.keyFeaturesZh : project.keyFeatures;
  const amenities = locale === "zh" ? project.amenitiesZh : project.amenities;

  // const relatedProjects = getRelatedProjects(params.slug, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <Hero
          title={title}
          // subtitle={`${project.category} • ${project.year}`}
          imageSrc={project.coverImage}
          imageAlt={title}
          heightClassName="h-screen"
        >
          {project.slug === "yigo-international-city-dubai" && (
            <a
              href="https://www.720yun.com/vr/e84jtsyf5y1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 shadow font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-5"
                aria-label={t("enterExperience")}
              >
                {t("enterExperience")}
              </Button>
            </a>
          )}
        </Hero>
      </div>

      <section className="py-24 relative">
        {/* Close Project Button */}
        <div className="absolute top-6 right-6 z-10">
          <Link href="/projects">
            <Button
              variant="outline"
              size="md"
              className="bg-black text-white px-3 py-1 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t("close")}
            >
              <span className="sr-only">{t("close")}</span>
              <p className="text-3xl font-normal flex items-center gap-1">
                &times; <span className="text-base mt-1">{t("close")}</span>{" "}
              </p>
            </Button>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Highlights Section */}
          {project.highlights && (
            <ProjectHighlights
              highlights={project.highlights}
              locale={locale}
            />
          )}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 mb-12 mt-4">
            <div className="md:col-span-3 ">
              <p className="text-neutral-600 text-base md:text-lg max-w-4xl leading-relaxed">
                {description}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="mt-6">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 shadow font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("registerInterest")}
                    </Button>
                  </Link>
                </div>
                {project.slug === "yigo-international-city-dubai" && (
                  <div className="mt-6 flex justify-center">
                    <Link
                      href="/images/projects/yigo-residence/brochure.pdf"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        size="md"
                        className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
                        aria-label={t("downloadBrochure")}
                      >
                        {t("downloadBrochure")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {project.slug === "yigo-international-city-dubai" && (
              <Image
                src="/images/projects/yigo-residence/intro.jpeg"
                className="w-full md:col-span-2"
                alt="Nabeel"
                width={1000}
                height={1000}
              />
            )}
          </div>

          {/* Video Section - Only for yigo-international-city-dubai */}
          {project.slug === "yigo-international-city-dubai" && (
            <FadeIn delay={0.2} className="mt-12">
              <div className="relative w-full aspect-video overflow-hidden">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="/images/projects/yigo-residence/yigo26_video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </FadeIn>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-10">
          {/* Key Features */}
          <FadeIn>
            <div className="lg:pl-40">
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-neutral-900">
                {project.slug === "yigo-international-city-dubai"
                  ? t("architecturalPhilosophy")
                  : t("keyFeatures")}
              </h2>
              <div className="mt-4 text-neutral-600 text-base md:text-lg max-w-4xl leading-relaxed">
                {keyFeatures?.map((feature, index) => (
                  <p key={index} className="mb-4">
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
        {/* Project Images Slider */}
        {project.images && project.images.length > 0 && (
          <FadeIn delay={0.1} className="mb-16">
            <div className="w-full">
              <ImageSlider
                images={project.images}
                alt={title}
                className="w-full"
              />
            </div>
          </FadeIn>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Images Trio */}
          {/* <FadeIn delay={0.15} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {(project.images.length > 0
                ? project.images.slice(0, 3)
                : [project.coverImage, project.coverImage, project.coverImage]
              ).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[2/3] overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </FadeIn> */}

          {/* Lifestyle & Amenities */}
          <FadeIn delay={0.25} className="mt-16">
            <h3 className="font-heading text-2xl md:text-3xl font-normal text-neutral-900">
              {t("lifestyleAmenities")}
            </h3>
            <div className="mt-4 text-neutral-600 text-base md:text-lg max-w-4xl leading-relaxed">
              {amenities?.map((amenity, index) => (
                <p key={index} className="mb-4">
                  {amenity}
                </p>
              ))}
            </div>
          </FadeIn>

          {/* Amenities Icons Grid */}
          {project.slug === "yigo-international-city-dubai" && (
            <FadeIn delay={0.3} className="mt-16">
              <Image
                src="/images/projects/yigo-residence/amenities.jpeg"
                alt="Amenities"
                width={1920}
                height={1080}
              />

              {/* Download Brochure */}
              <div className="mt-12 flex justify-center">
                <Link
                  href="/images/projects/yigo-residence/brochure.pdf"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    size="md"
                    className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
                    aria-label={t("downloadBrochure")}
                  >
                    {t("downloadBrochure")}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Floor Plans Section */}
      {/* {project.floorPlans && project.floorPlans.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h3 className="font-heading text-2xl md:text-3xl font-normal text-neutral-900">
                {locale === "zh" ? "户型图" : "FLOOR PLANS"}
              </h3>
              <FloorPlanGrid floorPlans={project.floorPlans} title={title} />
            </FadeIn>
          </div>
        </section>
      )} */}
      {project.floorPlans && project.floorPlans.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h3 className="font-heading text-2xl md:text-3xl font-normal text-neutral-900">
                {t("floorPlans")}
              </h3>
              <FloorPlanSlider floorPlans={project.floorPlans} title={title} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <ContactForm />
      </section>

      {/* Other Projects */}
      {/* {relatedProjects.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn mode="inView" className="text-center mb-12">
              <h2 className="font-heading text-3xl font-normal text-neutral-900 mb-4">
                Other Projects
              </h2>
              <p className="text-lg text-neutral-600">
                Explore more of our innovative work
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectCard
                  key={relatedProject.slug}
                  project={relatedProject}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )} */}
    </div>
  );
}
