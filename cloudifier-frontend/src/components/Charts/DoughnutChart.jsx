import { Doughnut } from "react-chartjs-2";
import { getConfigForCharts } from ".";

export const DoughnutChart = ({ objects, ...others }) => {
  const { usedMem, maxMem } = objects;
  const data = {
    labels: ["Free", "Used"],
    datasets: [
      {
        label: "Memory usage",
        data: [usedMem, maxMem],
        backgroundColor: ["green", "red"],
        hoverOffset: 2,
      },
    ],
  };
  return <Doughnut data={data} {...others} />;
};
