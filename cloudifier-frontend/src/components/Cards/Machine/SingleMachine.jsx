import { useEffect, useState } from "react";
import { dataChart } from "../../../data/ChartData";
import { LineChart } from "../../Charts";

const SingleMachine = ({ machineData }) => {

  // const [infos, setInfos] = useState(Array.from({ length: 5 }, () => ({
  //       label: `${new Date().getHours()}:${new Date().getMinutes()}`,
  //       data: Math.random() * 100,
  //   })));
  const [infos, setInfos] = useState([]);
  const updateChart = ()=>{
    const date = new Date();
  
    
    infos.push({
      label: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      data: Math.random() * 100,
    })
    setInfos([...infos])
    if(infos.length == 5)
      infos.shift()
    
   
     
  }
  useEffect(() => {
      setInterval(function(){updateChart()}, 2000);
  }, []);




  return (
    <div className="w-full">
       <div>Our Machine</div>
       <div className="w-1/4">
       <LineChart className=" shadow-sm" objects={infos} title="Pie chart" />
      </div>
    </div>

  );
};

export default SingleMachine;
