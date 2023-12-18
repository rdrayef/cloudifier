import React from "react";
import { useServerStatus } from "../contexts/useServerStatus";
import RatingBar from "./RatingBar";

const StatusDisplay = () => {
  const { serverStatus } = useServerStatus();

  if (!serverStatus) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <p className="text-lg font-bold mb-4">Server Information</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">
            Server Uptime: {serverStatus.uptime} seconds
          </p>
          <RatingBar rating={serverStatus.uptime / 86400 * 100} />
        </div>
        <div>
          <p className="text-gray-600">
            Load Average: {serverStatus.loadavg.join(", ")}
          </p>
        </div>
        {/* Add more information display based on your needs */}
      </div>
    </div>
  );
};

export default StatusDisplay;
