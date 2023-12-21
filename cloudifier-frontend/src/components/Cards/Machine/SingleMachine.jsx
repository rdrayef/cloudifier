import useProxmox from "../../../config/Store";
import { ReactiveLineChart } from "../../Charts";
import { DoughnutChart } from "../../Charts/DoughnutChart";
import { useReactiveData } from "../../Charts/useReactiveChart";

const SingleMachine = ({ node, vmid, type }) => {
  const { cpuData, memData } = useReactiveData(node, vmid, 10, type);
  return (
    <>
      <div>Our Machine</div>
      <div className="w-full flex flex-row align-middle justify-center">
        <div className="w-1/4">
          <ReactiveLineChart
            className=" shadow-sm"
            objects={cpuData}
            title="CPU usage"
          />
        </div>
        <div className="w-1/4">
          <DoughnutChart
            className=" shadow-sm"
            objects={memData}
            title="Memory usage"
          />
        </div>
      </div>
    </>
  );
};

export default SingleMachine;
