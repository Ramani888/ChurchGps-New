import React from 'react';
import { LanguageProvider } from './languageContext/LanguageContext';
import { LanguageBoundary } from './languageContext/LanguageBoundary';
import { StateProvider } from './StateContext';
import { UserProvider } from './UserContext';

const AppProvider = ({ children }) => (
  <LanguageProvider>
    <LanguageBoundary>
      <UserProvider>
        <StateProvider>{children}</StateProvider>
      </UserProvider>
    </LanguageBoundary>
  </LanguageProvider>
);

export default AppProvider;
