import { Bar } from "react-chartjs-2";
import { getConfigForCharts } from ".";




export const BarChart = ({objects, ...others}) => {

    const config = getConfigForCharts(objects);

    return (
        <Bar data={config} {...others} />
    )
}