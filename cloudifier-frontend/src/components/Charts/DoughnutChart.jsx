import { Doughnut } from "react-chartjs-2";
import { getConfigForCharts } from ".";

export const DoughnutChart = ({ config, ...others }) => {
  //   const configData = getConfigForCharts(objects);
  const consumed = Math.random() * 5;
  const data = {
    labels: ["Free", "Used"],
    datasets: [
      {
        label: "Memory usage",
        data: [consumed, 100 - consumed],
        backgroundColor: ["green", "red"],
        hoverOffset: 2,
      },
    ],
  };
  return <Doughnut data={data} {...others} />;
};
