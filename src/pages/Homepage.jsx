import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import VideoSection from "../components/VideoSection";
import Journey from "../components/Journey";
import FeaturedProjects from "../components/FeaturedProjects";
import LifestyleSection from "../components/LifestyleSection";
import Craftsmanship from "../components/Craftsmanship";
import NewsMedia from "../components/NewsMedia";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Homepage = () => {
  const [logoVisible, setLogoVisible] = useState(false);

  return (
    <div className="overflow-hidden">
      <Header logoVisible={logoVisible} />
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
