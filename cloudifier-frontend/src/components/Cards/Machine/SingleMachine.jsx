import { ReactiveLineChart } from "../../Charts";
import { useReactiveData } from "../../Charts/useReactiveChart";
import useProxmox from "../../../config/Store";

const SingleMachine = () => {

  const proxmoxClient = useProxmox((state) => state.proxmoxClient)
  const data = useReactiveData(10,proxmoxClient.getNodeStatus())





  return (
    <div className="w-full">
       <div>Our Machine</div>
       <div className="w-1/4">
       <ReactiveLineChart className=" shadow-sm" objects={data} title="Pie chart" />
      </div>
    </div>

  );
};

export default SingleMachine;
