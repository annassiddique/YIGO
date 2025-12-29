import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HeaderProvider } from "./context/HeaderContext";
import Homepage from "./pages/Homepage";
import Projectspage from "./pages/Projectspage";
import Footer from "./components/Footer";
import Contactpage from "./pages/Contactpage";
import Aboutpage from "./pages/Aboutpage";
import Header from "./components/Header";
import Newspage from "./pages/Newspage";
import Careerpage from "./pages/Careerpage";

// Language wrapper component
function LanguageWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    
    // Check if URL has a language prefix
    if (pathLang === 'en' || pathLang === 'zh') {
      // Change language if different
      if (i18n.language !== pathLang) {
        i18n.changeLanguage(pathLang);
      }
    } else {
      // Redirect to language-prefixed URL
      const currentLang = localStorage.getItem('i18nextLng') || 'en';
      const newPath = `/${currentLang}${location.pathname}${location.search}`;
      navigate(newPath, { replace: true });
    }
  }, [location, i18n, navigate]);

  return children;
}

function AppContent() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Check if we're on homepage (e.g., /en or /zh or /en/ or /zh/)
  const isHomepage = pathSegments.length === 1 || 
                     (pathSegments.length === 2 && pathSegments[1] === '');

  return (
    <>
      <Header showLogo={!isHomepage} />
      <Routes>
        {/* Redirect root to /en */}
        <Route path="/" element={<Navigate to="/en" replace />} />
        
        {/* Language-based routes */}
        <Route path="/:lang" element={<LanguageWrapper><Homepage /></LanguageWrapper>} />
        <Route path="/:lang/about" element={<LanguageWrapper><Aboutpage /></LanguageWrapper>} />
        <Route path="/:lang/projects" element={<LanguageWrapper><Projectspage /></LanguageWrapper>} />
        <Route path="/:lang/careers" element={<LanguageWrapper><Careerpage /></LanguageWrapper>} />
        <Route path="/:lang/news-media" element={<LanguageWrapper><Newspage /></LanguageWrapper>} />
        <Route path="/:lang/contact" element={<LanguageWrapper><Contactpage /></LanguageWrapper>} />
        
        {/* Catch all - redirect to English version */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <HeaderProvider>
      <AppContent />
    </HeaderProvider>
  );
}

export default App;