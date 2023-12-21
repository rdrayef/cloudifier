import { ReactiveLineChart } from "../../Charts";
import { DoughnutChart } from "../../Charts/DoughnutChart";
import { useReactiveData } from "../../Charts/useReactiveChart";

const SingleMachine = ({node,vmid}) => {

  const data = useReactiveData(node,vmid, 10)




  return (
    <div className="w-full">
       <div>Our Machine</div>
       <div className="w-1/4">
       <ReactiveLineChart className=" shadow-sm" objects={data} title="CPU usage" />
       {/* <DoughnutChart className=" shadow-sm" objects={{}} title="CPU usage" /> */}
      </div>
    </div>

  );
};

export default SingleMachine;
