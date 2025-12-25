import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [visibleEditAccount, setVisibleEditAccount] = useState(false);
  const [languageChangeFromProfile, setLanguageChangeFromProfile] = useState(false);
  const [changeBackgroundNumber, setChangeBackgroundNumber] = useState(1);

  return (
    <StateContext.Provider
      value={{
        setVisibleEditAccount,
        visibleEditAccount,
        setLanguageChangeFromProfile,
        languageChangeFromProfile,
        setChangeBackgroundNumber,
        changeBackgroundNumber,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
