import React from "react";
import Contact from "../components/Contact";
import Header from "../components/Header";

const Contactpage = () => {
  return (
    <>
      <Header />
      <div className="overflow-hidden mt-28">
        <Contact />
      </div>
    </>
  );
};

export default Contactpage;
