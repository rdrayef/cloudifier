import { Line } from "react-chartjs-2";
import { getConfigForCharts } from ".";




export const ReactiveLineChart = ({objects, ...others}) => {
    const dataOptions = {
        label: 'CPU Usage',               
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
    }
    const config = getConfigForCharts(objects,dataOptions);
    const chartOptions =     {scales: {
        y: {
            type: 'linear',
            min: 0,
            max: 100
        }
    }}
    return (
        <Line data={config} options={chartOptions}  {...others} />
    )
}