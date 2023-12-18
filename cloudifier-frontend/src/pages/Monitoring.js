import React from "react";
import { WebSocketProvider } from "../contexts/WebSocketContext";
import { ServerStatusProvider } from "../contexts/ServerStatusContext";
import StatusDisplay from "../components/Monitoring/StatusDisplay";

const App = () => {
  useServerStatusObserver();

  return (
    <WebSocketProvider>
      <ServerStatusProvider>
        <div>
          <h1>Proxmox Server Monitoring</h1>
          <StatusDisplay />
        </div>
      </ServerStatusProvider>
    </WebSocketProvider>
  );
};

export default App;
