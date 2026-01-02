import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createSocket, disconnectSocket } from "../services/socket";
// ...existing code...
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchTokenAndConnect = async () => {
      const storedToken = await AsyncStorage.getItem('TOKEN');
      if (storedToken) {
        createSocket(storedToken).then(setSocket);
      } else {
        disconnectSocket();
        setSocket(null);
      }
    };
    fetchTokenAndConnect();
    // Disconnect on unmount
    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
