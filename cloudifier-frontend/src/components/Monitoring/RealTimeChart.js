import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/useWebSocket";

const RealTimeChart = ({ label, color, socketEvent }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label,
        data: [],
        fill: false,
        borderColor: color
      }
    ]
  });

  const { socket } = useWebSocket();

  useEffect(
    () => {
      const updateChartData = dataPoint => {
        setChartData(prevData => ({
          ...prevData,
          labels: [...prevData.labels, new Date().toLocaleTimeString()],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, dataPoint]
            }
          ]
        }));
      };

      if (socket) {
        socket.on(socketEvent, event => {
          const newDataPoint = event.data; // Adjust this based on your WebSocket payload
          updateChartData(newDataPoint);
        });

        return () => {
          socket.off(socketEvent);
        };
      }
    },
    [socket, socketEvent]
  );

  return (
    <div className="mt-4">
      <Line data={chartData} />
    </div>
  );
};

export default RealTimeChart;
