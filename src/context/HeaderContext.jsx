/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState } from 'react';

const HeaderContext = createContext();

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
};

export const HeaderProvider = ({ children }) => {
  const [logoVisible, setLogoVisible] = useState(false);

  return (
    <HeaderContext.Provider value={{ logoVisible, setLogoVisible }}>
      {children}
    </HeaderContext.Provider>
  );
};