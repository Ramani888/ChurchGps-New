import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  useLayoutEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const storedUserToken = await AsyncStorage.getItem('TOKEN');
    const storedUserUser = await AsyncStorage.getItem('USER');
    if (storedUserToken || storedUserUser) {
      setToken(storedUserToken);
      setUser(JSON.parse(storedUserUser));
    }
  };

  const onUpdateProfile = async userData => {
    await AsyncStorage.setItem('USER', JSON.stringify(userData));
    setUser(userData);
  };

  const signIn = () => {
    getInitialData();
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        onUpdateProfile,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserDetail = () => useContext(UserContext);
