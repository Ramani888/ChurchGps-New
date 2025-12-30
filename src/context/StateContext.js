import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [visibleEditAccount, setVisibleEditAccount] = useState(false);
  const [languageChangeFromProfile, setLanguageChangeFromProfile] = useState(false);
  const [changeBackgroundNumber, setChangeBackgroundNumber] = useState('1');

  useFocusEffect(
    useCallback(() => {
      getInitialValue();
    }, []),
  );

  const getInitialValue = useCallback(async () => {
    const initialBackgroundNumber = await AsyncStorage.getItem('backgroundNumber');
    setChangeBackgroundNumber(initialBackgroundNumber ?? '1');
  }, []);

  const handleBackgrounChange = useCallback(async value => {
    await AsyncStorage.setItem('backgroundNumber', value);
    setChangeBackgroundNumber(value);
  }, []);

  return (
    <StateContext.Provider
      value={{
        setVisibleEditAccount,
        visibleEditAccount,
        setLanguageChangeFromProfile,
        languageChangeFromProfile,
        handleBackgrounChange,
        changeBackgroundNumber,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
