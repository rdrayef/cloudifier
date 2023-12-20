import { useEffect, useState } from "react";


export const useReactiveData = (callback, length) => {

    const [data, setData] = useState([]);
    const updateChart = ()=>{
        const date = new Date();
        data.push({
          label: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          data: callback()
        })
        setData([...data])
        if(data.length === length)
        data.shift()  
    }

    useEffect(() => {
        setInterval(function(){updateChart()}, 2000);
    }, []);
    
    return data;
}