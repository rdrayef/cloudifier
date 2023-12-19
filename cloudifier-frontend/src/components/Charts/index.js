import { LineChart } from "./LineChart";
import { Chart as ChartJS, registerables  } from "chart.js";

ChartJS.register(...registerables);


const prepareObject = (objects) =>{
    const { labels, datas, backgrounds, borders } = objects.reduce((acc, { label, data, color, borderColor }) => {
        acc.labels.push(label);
        acc.datas.push(data);
        acc.backgrounds.push(color);
        acc.borders.push(borderColor);
        return acc;
    }, { labels: [], datas: [], backgrounds: [], borders: [] });
    return { labels, datas, backgrounds, borders };
}

const getConfigForCharts = (objects)=>{
    const { labels, datas, backgrounds, borders } = prepareObject(objects);
    const config = {
        labels : labels,
        datasets : [
            {
                data : datas,
                backgroundColor: backgrounds,
                borderColor: borders,
                borderWidth: 1,
                
            }
        ]
    }
    return config;
}

export {LineChart, getConfigForCharts}

