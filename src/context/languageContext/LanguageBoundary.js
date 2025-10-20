import React from 'react';
import { useLanguage } from './LanguageContext';

export const LanguageBoundary = ({ children }) => {
  const { selectedLanguage } = useLanguage();

  return <React.Fragment key={selectedLanguage}>{children}</React.Fragment>;
};
