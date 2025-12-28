import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Projectspage from "./pages/Projectspage";
import Footer from "./components/Footer";
import Contactpage from "./pages/Contactpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<Projectspage />} />
        <Route path="/contact" element={<Contactpage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
