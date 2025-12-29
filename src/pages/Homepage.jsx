import React from "react";
import { useTranslation } from "react-i18next";
import { useHeader } from "../context/HeaderContext";
import Hero from "../components/Hero";
import VideoSection from "../components/VideoSection";
import Journey from "../components/Journey";
import FeaturedProjects from "../components/FeaturedProjects";
import LifestyleSection from "../components/LifestyleSection";
import Craftsmanship from "../components/Craftsmanship";
import NewsMedia from "../components/NewsMedia";
import Contact from "../components/Contact";

const Homepage = () => {
  const { setLogoVisible } = useHeader();
  const { t } = useTranslation("home");

  return (
    <div className="overflow-hidden">
      <Hero onLogoVisibilityChange={setLogoVisible} />
      <div className="overflow-x-hidden">
        <VideoSection />
        <Journey />
      </div>
      <FeaturedProjects />
      <LifestyleSection />
      <Craftsmanship />
      <NewsMedia />
      <Contact />
    </div>
  );
};

export default Homepage;
