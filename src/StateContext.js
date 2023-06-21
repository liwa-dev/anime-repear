// StateContext.js
import React, { createContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <StateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
