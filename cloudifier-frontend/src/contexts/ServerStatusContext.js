import React, { createContext, useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import ServerStatusUtility from "../utilities/ServerStatusUtility";
import { useServerStatus } from "./useServerStatus";

const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = React.useState(null);
  const { socket } = useWebSocket();

  useEffect(
    () => {
      if (!socket) return;

      const handleServerStatus = status => {
        ServerStatusUtility.updateServerStatus(status, setServerStatus);
      };

      socket.addEventListener("message", handleServerStatus);

      return () => {
        socket.removeEventListener("message", handleServerStatus);
      };
    },
    [socket]
  );

  return (
    <ServerStatusContext.Provider value={{ serverStatus }}>
      {children}
    </ServerStatusContext.Provider>
  );
};

export { useServerStatus };
