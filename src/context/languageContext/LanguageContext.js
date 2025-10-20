import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { strings } from '../../language/strings';
import { communityStrings } from '../../communityLanguage/communityStrings';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [communityLanguages, setCommunityLanguages] = useState(['en']);

  useFocusEffect(
    useCallback(() => {
      const getInitialValue = async () => {
        const selectedLanguage = await AsyncStorage.getItem('storedLanguage');
        const currentLanguage = await AsyncStorage.getItem(
          'storedCurrentLanguage',
        );
        strings.setLanguage(selectedLanguage);
        setSelectedLanguage(selectedLanguage);
        setCurrentLanguage(currentLanguage);
      };

      getInitialValue();
    }, []),
  );

  const onChangeLanguage = useCallback(
    async (language, currentLanguage) => {
      await AsyncStorage.setItem('storedLanguage', language);
      await AsyncStorage.setItem('storedCurrentLanguage', currentLanguage);
      strings.setLanguage(language);
      setSelectedLanguage(language);
    },
    [selectedLanguage],
  );

  const onToggleCommunityLanguage = useCallback(async code => {
    await AsyncStorage.setItem(
      'communityLanguage',
      JSON.stringify([...communityLanguages, code]),
    );
    setCommunityLanguages(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code],
    );
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        onChangeLanguage,
        currentLanguage,
        setCurrentLanguage,
        onToggleCommunityLanguage,
        communityLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
