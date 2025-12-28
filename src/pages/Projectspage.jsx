import React from "react";
import FeaturedProjects from "../components/FeaturedProjects";
import Header from "../components/Header";

const Projectspage = () => {
  return (
    <>
      <Header logoVisible={true} />
      <div className="mt-28 overflow-hidden">
        <FeaturedProjects />
      </div>
    </>
  );
};

export default Projectspage;
