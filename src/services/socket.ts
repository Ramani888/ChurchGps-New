import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

let socket: Socket | null = null;

const baseURL = 'https://churchgps.com';
// const baseURL = "http://192.168.1.4:3010"; // local dev

export const createSocket = async (): Promise<Socket> => {
    if (socket) return socket;

    const token = await AsyncStorage.getItem("TOKEN");

    socket = io(baseURL, {
        path: "/socket.io",
        auth: { token },
        transports: ["websocket", "polling"], // ✅ MUST
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
    });

    // 🔍 DEBUG (TEMP)
    socket.on("connect", () => {
        if (socket) {
        console.log("✅ Socket connected:", socket.id);
        }
    });

    socket.on("connect_error", (err) => {
        console.log("❌ Socket connect_error:", err.message);
    });

    return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
