import React, { useState } from 'react';
import './MachineCard.css'; // Import your CSS file

const MachineCard = ({ machineData }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stopped':
        return '#FF3300'; // Darker orange color for stopped status
      case 'running':
        return '#00AD6F'; // Darker blue color for running status
      default:
        return '#FF9F33'; // Orange color for other statuses
    }
  };

  return (
    <div
      className="machine-card"
      onClick={handleClick}
      style={{ borderColor: getStatusColor(machineData.status) }}
    >
      <div className="machine-header" style={{ color: getStatusColor(machineData.status) }}>
        <h2>{machineData.name}</h2>
        <p>Status: {machineData.status}</p>
      </div>
      {expanded && (
        <div className="machine-details">
          <p>CPU: {machineData.cpu}</p>
          <p>Memory: {machineData.mem}</p>
          <p>Disk: {machineData.disk}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default MachineCard;
