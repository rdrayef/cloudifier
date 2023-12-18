import React from "react";
import ServerInfo from "./ServerInfo";
import RealTimeChart from "./RealTimeChart";

const MonitoringPanel = () => {
  return (
    <div>
      <h2>Monitoring Panel</h2>
      <ServerInfo />
      <div className="grid grid-cols-2 gap-4">
        <RealTimeChart
          label="CPU Usage"
          color="#3498db"
          socketEvent="cpuUsage"
        />
        <RealTimeChart
          label="RAM Usage"
          color="#2ecc71"
          socketEvent="ramUsage"
        />
      </div>
      {/* Add more monitoring components as needed */}
    </div>
  );
};

export default MonitoringPanel;
