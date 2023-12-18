import { WebSocketProvider } from "../contexts/WebSocketContext";
import StatusDisplay from "../components/Monitoring/StatusDisplay";

const Monitoring = () => {
  useServerStatusObserver();

  return (
    <>
    <WebSocketProvider>
      <ServerStatusProviderder>
        <div>
          <h1>Proxmox Server Monitoring</h1>
          <StatusDisplay />
        </div>
      </ServerStatusProviderder>
    </WebSocketProvider>
    </>
  );
};

export default Monitoring;
