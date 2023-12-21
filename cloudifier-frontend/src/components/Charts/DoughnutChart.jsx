import { Doughnut } from "react-chartjs-2";
import { getConfigForCharts } from ".";




export const DoughnutChart = ({objects, ...others}) => {

    const config = getConfigForCharts(objects);

    return (
        <Doughnut data={config} {...others} />
    )
}