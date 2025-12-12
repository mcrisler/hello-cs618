// src/contexts/SocketContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export function useSocket() {
  return useContext(SocketContext);
}
export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const backendUrl = import.meta.env.VITE_SOCKET_HOST;

  useEffect(() => {
    const newSocket = io(backendUrl);
    newSocket.on("connect", () => {
      console.log("Socket.IO connected:", newSocket.id);
    });
    newSocket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [backendUrl]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
SocketContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
