import { Line } from "react-chartjs-2";
import { getConfigForCharts } from ".";




export const ReactiveLineChart = ({objects, ...others}) => {
    
    const config = getConfigForCharts(objects);

    return (
        <Line data={config} {...others} />
    )
}