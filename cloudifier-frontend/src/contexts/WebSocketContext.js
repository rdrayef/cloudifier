import React, { createContext } from "react";
import WebSocketUtility from "../utilities/WebSocketUtility";
import { useWebSocket } from "./useWebSocket";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socket = new WebSocketUtility("ws://your-websocket-server-url");

  const closeSocket = () => {
    socket.close();
  };

  return (
    <WebSocketContext.Provider value={{ socket, closeSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { useWebSocket };
